import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { tmpdir } from "node:os";
import { join } from "node:path";

const source = process.argv[2];
const output = process.argv[3] ?? "public/models/retro-terminal.glb";

if (!source) {
  console.error("Pakai: node scripts/compress-glb.mjs <source.glb> [out.glb]");
  console.error("  source = ekspor mentah dari Blender, bukan file yang sudah terkompresi.");
  process.exit(1);
}

const KNOWN_EXTENSIONS = [
  "KHR_draco_mesh_compression",
  "KHR_materials_specular",
  "KHR_texture_transform",
  "KHR_materials_emissive_strength",
  "KHR_materials_ior",
  "KHR_materials_transmission",
  "KHR_materials_volume",
  "KHR_materials_clearcoat",
  "KHR_materials_sheen",
  "KHR_materials_roughness_reduction",
  "KHR_mesh_quantization",
];

function usedExtensions(node, out) {
  if (!node || typeof node !== "object") return;
  if (node.extensions) for (const key of Object.keys(node.extensions)) out.add(key);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) for (const item of value) usedExtensions(item, out);
    else if (value && typeof value === "object") usedExtensions(value, out);
  }
}

function declareExtensions(buf) {
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`Bukan file GLB: ${source}`);

  const jsonLength = buf.readUInt32LE(12);
  const json = JSON.parse(buf.slice(20, 20 + jsonLength).toString("utf8"));

  const found = new Set();
  usedExtensions({ ...json, extensionsUsed: undefined, extensionsRequired: undefined }, found);

  const declared = new Set(json.extensionsUsed ?? []);
  const dropped = [];
  for (const key of found) {
    if (KNOWN_EXTENSIONS.includes(key)) declared.add(key);
    else dropped.push(key);
  }
  json.extensionsUsed = [...declared].sort();

  const text = JSON.stringify(json);
  const pad = (4 - (text.length % 4)) % 4;
  const jsonChunkLength = text.length + pad;
  const binOffset = 20 + jsonLength + 8;
  const bin = buf.slice(binOffset, binOffset + buf.readUInt32LE(20 + jsonLength));

  const out = Buffer.alloc(12 + 8 + jsonChunkLength + (bin.length ? 8 + bin.length : 0));
  out.writeUInt32LE(0x46546c67, 0);
  out.writeUInt32LE(2, 4);
  out.writeUInt32LE(out.length, 8);
  out.writeUInt32LE(jsonChunkLength, 12);
  out.writeUInt32LE(0x4e4f534a, 16);
  out.write(text, 20);
  for (let i = 0; i < pad; i++) out.writeUInt8(0x20, 20 + text.length + i);
  if (bin.length) {
    const offset = 20 + jsonChunkLength;
    out.writeUInt32LE(bin.length, offset);
    out.writeUInt32LE(0x004e4942, offset + 4);
    bin.copy(out, offset + 8);
  }
  return { buffer: out, json, dropped };
}

function readJson(buf) {
  return JSON.parse(buf.slice(20, 20 + buf.readUInt32LE(12)).toString("utf8"));
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const wire = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const original = readFileSync(source);
const { buffer: declaredBuf, json: originalJson, dropped } = declareExtensions(original);

const workdir = tmpdir();
const declaredPath = join(workdir, "compro-decl.glb");
const compressedPath = join(workdir, "compro-draco.glb");
writeFileSync(declaredPath, declaredBuf);

console.log(`\nsource       ${source}  ${kb(original.length)}`);
console.log(`extensionsUsed baru: ${JSON.stringify(originalJson.extensionsUsed ?? null)} -> ${JSON.stringify(readJson(declaredBuf).extensionsUsed)}`);
if (dropped.length) {
  console.log(`  dilewati (tidak dikenal gltf-transform): ${dropped.join(", ")}`);
}

execFileSync("npx", ["-y", "@gltf-transform/cli", "draco", declaredPath, compressedPath], {
  stdio: "inherit",
});

const compressed = readFileSync(compressedPath);
const compressedJson = readJson(compressed);

const sourceMeshes = (originalJson.meshes ?? []).map((m) => `${m.name}:${m.primitives.length}`);
const resultMeshes = (compressedJson.meshes ?? []).map((m) => `${m.name}:${m.primitives.length}`);
if (sourceMeshes.join() !== resultMeshes.join()) {
  console.error(`GAGAL: struktur mesh berubah ${sourceMeshes} -> ${resultMeshes}`);
  process.exit(1);
}

const sourceMaterials = (originalJson.materials ?? []).map((m) => m.name);
const resultMaterials = (compressedJson.materials ?? []).map((m) => m.name);
if (sourceMaterials.join() !== resultMaterials.join()) {
  console.error(`GAGAL: material berubah ${sourceMaterials} -> ${resultMaterials}`);
  process.exit(1);
}

for (const key of readJson(declaredBuf).extensionsUsed ?? []) {
  if (key === "KHR_draco_mesh_compression") continue;
  const present = JSON.stringify(compressedJson.extensionsUsed ?? []);
  if (!present.includes(key)) {
    console.error(`GAGAL: ekstensi ${key} hilang setelah kompresi -> warna/permukaan material berubah.`);
    process.exit(1);
  }
}

writeFileSync(output, compressed);
rmSync(declaredPath, { force: true });
rmSync(compressedPath, { force: true });

const gz = (buf) => gzipSync(buf, { level: 9 }).length;

console.log(`\nselesai -> ${output}`);
console.log(`  raw    ${kb(original.length)} -> ${kb(compressed.length)}`);
console.log(`  gzip   ${wire(gz(original))} -> ${wire(gz(compressed))}`);
console.log("");
