import { readFileSync, writeFileSync } from "node:fs";

const GLB_MAGIC = 0x46546c67;
const CHUNK_JSON = 0x4e4f534a;
const CHUNK_BIN = 0x004e4942;

const [, , sourcePath, destPath, ...imagePaths] = process.argv;
const materialIndex = Number(process.env.EMBED_MATERIAL_INDEX ?? 0);

const SLOTS = ["baseColorTexture", "metallicRoughnessTexture", "normalTexture"];
const PBR_SLOTS = ["baseColorTexture", "metallicRoughnessTexture"];

if (!sourcePath || !destPath || imagePaths.length === 0) {
  console.error(
    "Usage: node scripts/embed-textures.mjs <source.glb> <dest.glb> <albedo.png> <metalness.png> <normal.png> [...]\n" +
      "       slot follows position: 1=baseColor, 2=metallicRoughness, 3=normal\n" +
      "       wired into material index 0, override with EMBED_MATERIAL_INDEX",
  );
  process.exit(1);
}

const align4 = (value) => Math.ceil(value / 4) * 4;
const mimeFor = (filePath) => {
  const ext = filePath.toLowerCase().split(".").pop();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "webp") return "image/webp";
  return "image/png";
};

const glb = readFileSync(sourcePath);
if (glb.readUInt32LE(0) !== GLB_MAGIC) {
  console.error(`Bukan file GLB: ${sourcePath}`);
  process.exit(1);
}

const jsonLength = glb.readUInt32LE(12);
const json = JSON.parse(glb.slice(20, 20 + jsonLength).toString("utf8"));
const binLength = glb.readUInt32LE(20 + jsonLength);
const bin = Buffer.from(glb.slice(20 + jsonLength + 8, 20 + jsonLength + 8 + binLength));

json.images ??= [];
json.samplers ??= [{ wrapS: 10497, wrapT: 10497 }];
json.textures ??= [];
json.bufferViews ??= [];
json.buffers ??= [{ byteLength: binLength }];
json.buffers[0].byteLength ??= binLength;

let writeCursor = align4(bin.length);
const appended = [];

for (const [i, imagePath] of imagePaths.entries()) {
  const bytes = readFileSync(imagePath);
  const offset = align4(writeCursor);
  const padding = Buffer.alloc(offset - writeCursor, 0);

  if (padding.length > 0) {
    appended.push(padding);
    writeCursor = offset;
  }

  appended.push(bytes);
  writeCursor += bytes.length;

  const viewIndex = json.bufferViews.length;
  json.bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length });

  if (json.images[i] === undefined) {
    const textureIndex = json.textures.length;
    json.samplers.push({ wrapS: 10497, wrapT: 10497 });
    json.textures.push({ source: i, sampler: textureIndex });
  }

  json.images[i] = { bufferView: viewIndex, mimeType: mimeFor(imagePath) };

  const material = json.materials?.[materialIndex];
  if (material && SLOTS[i]) {
    const slot = SLOTS[i];
    const textureIndex = json.textures.findIndex((t) => t.source === i);
    if (PBR_SLOTS.includes(slot)) {
      material.pbrMetallicRoughness ??= {};
      material.pbrMetallicRoughness[slot] = { index: textureIndex };
    } else {
      material[slot] = { index: textureIndex };
    }
  }

  console.log(
    `  images[${i}] ← ${imagePath.split("/").pop()}  ${(bytes.length / 1024).toFixed(1)} KB  @ offset ${offset}`,
  );
}

const newBin = Buffer.concat([bin, ...appended]);
json.buffers[0].byteLength = newBin.length;

const jsonPayload = Buffer.from(JSON.stringify(json), "utf8");
const jsonPadded = Buffer.concat([
  jsonPayload,
  Buffer.alloc(align4(jsonPayload.length) - jsonPayload.length, 0x20),
]);
const binPadded = Buffer.concat([
  newBin,
  Buffer.alloc(align4(newBin.length) - newBin.length, 0x00),
]);

const total = 12 + 8 + jsonPadded.length + 8 + binPadded.length;
const out = Buffer.alloc(total);

let cursor = 0;
out.writeUInt32LE(GLB_MAGIC, cursor);
out.writeUInt32LE(2, cursor + 4);
out.writeUInt32LE(total, cursor + 8);
cursor += 12;

out.writeUInt32LE(jsonPadded.length, cursor);
out.writeUInt32LE(CHUNK_JSON, cursor + 4);
jsonPadded.copy(out, cursor + 8);
cursor += 8 + jsonPadded.length;

out.writeUInt32LE(binPadded.length, cursor);
out.writeUInt32LE(CHUNK_BIN, cursor + 4);
binPadded.copy(out, cursor + 8);

writeFileSync(destPath, out);

console.log(
  `\n  ${sourcePath} (${(glb.length / 1024 / 1024).toFixed(2)} MB)` +
    `  →  ${destPath} (${(out.length / 1024 / 1024).toFixed(2)} MB)`,
);
