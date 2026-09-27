import { readFileSync, writeFileSync } from "node:fs";

const GLB_MAGIC = 0x46546c67;
const CHUNK_JSON = 0x4e4f534a;
const CHUNK_BIN = 0x004e4942;

const align4 = (value) => Math.ceil(value / 4) * 4;

const TEXTURE_SLOTS = [
  "baseColorTexture",
  "metallicRoughnessTexture",
  "normalTexture",
  "emissiveTexture",
  "occlusionTexture",
];

const [, , sourcePath, destPath] = process.argv;

if (!sourcePath || !destPath) {
  console.error("Usage: node scripts/strip-textures.mjs <source.glb> <dest.glb>");
  process.exit(1);
}

const glb = readFileSync(sourcePath);
if (glb.readUInt32LE(0) !== GLB_MAGIC) {
  console.error(`Bukan file GLB: ${sourcePath}`);
  process.exit(1);
}

const jsonLength = glb.readUInt32LE(12);
const json = JSON.parse(glb.slice(20, 20 + jsonLength).toString("utf8"));
const binLength = glb.readUInt32LE(20 + jsonLength);
const bin = glb.slice(20 + jsonLength + 8, 20 + jsonLength + 8 + binLength);

// drop every material slot that points at a texture
for (const material of json.materials ?? []) {
  const pbr = material.pbrMetallicRoughness;
  if (pbr) {
    delete pbr.baseColorTexture;
    delete pbr.metallicRoughnessTexture;
  }
  for (const slot of TEXTURE_SLOTS) delete material[slot];
}

// keep only the textures something still references, remapping the indices
const used = new Set();
for (const material of json.materials ?? []) {
  const pbr = material.pbrMetallicRoughness;
  for (const holder of [pbr, material]) {
    if (!holder) continue;
    for (const slot of TEXTURE_SLOTS) {
      if (holder[slot]) used.add(holder[slot].index);
    }
  }
}

const textures = json.textures ?? [];
const keep = [...used].sort((a, b) => a - b);
const textureRemap = new Map(keep.map((oldIndex, newIndex) => [oldIndex, newIndex]));

if (keep.length > 0) {
  const nextTextures = [];
  for (const oldIndex of keep) {
    const texture = { ...textures[oldIndex] };
    if (texture.source !== undefined) {
      texture.source = keep.indexOf(texture.source);
    }
    if (texture.sampler !== undefined) {
      texture.sampler = keep.indexOf(texture.sampler);
    }
    nextTextures.push(texture);
  }
  json.textures = nextTextures;
  json.samplers = (json.samplers ?? []).filter((_, index) => keep.includes(index));

  for (const material of json.materials ?? []) {
    const pbr = material.pbrMetallicRoughness;
    for (const holder of [pbr, material]) {
      if (!holder) continue;
      for (const slot of TEXTURE_SLOTS) {
        if (holder[slot]) holder[slot].index = textureRemap.get(holder[slot].index);
      }
    }
  }
} else {
  delete json.textures;
  delete json.samplers;
  delete json.images;
}

if (Array.isArray(json.extensionsUsed)) {
  const filtered = json.extensionsUsed.filter((name) => /texture|image/i.test(name));
  if (filtered.length > 0) json.extensionsUsed = filtered;
  else delete json.extensionsUsed;
}

json.buffers[0].byteLength = bin.length;

const jsonPayload = Buffer.from(JSON.stringify(json), "utf8");
const jsonPadded = Buffer.concat([
  jsonPayload,
  Buffer.alloc(align4(jsonPayload.length) - jsonPayload.length, 0x20),
]);
const binPadded = Buffer.concat([bin, Buffer.alloc(align4(bin.length) - bin.length, 0x00)]);

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

const dropped = (textures.length ? textures.length : 0) - keep.length;
console.log(
  `  ${sourcePath} (${(glb.length / 1024 / 1024).toFixed(2)} MB)` +
    `  →  ${destPath} (${(out.length / 1024 / 1024).toFixed(2)} MB)`,
);
console.log(`  texture dilepas: ${dropped}, sisa: ${keep.length}`);
