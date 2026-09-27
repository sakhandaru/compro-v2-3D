import { readFileSync, existsSync } from "node:fs";

const target = process.argv[2] ?? "public/models/retro2.glb";

if (!existsSync(target)) {
  console.error(`File tidak ditemukan: ${target}`);
  process.exit(1);
}

const buf = readFileSync(target);

if (buf.readUInt32LE(0) !== 0x46546c67) {
  console.error(`Bukan file GLB: ${target}`);
  process.exit(1);
}

const totalLength = buf.readUInt32LE(8);
const jsonLength = buf.readUInt32LE(12);
const json = JSON.parse(buf.slice(20, 20 + jsonLength).toString("utf8"));

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
const pad = (value, width) => String(value).padEnd(width);

console.log(`\n${target}`);
console.log(`  file size      ${mb(buf.length)} (header Claims ${mb(totalLength)})`);
console.log(`  json chunk     ${mb(jsonLength)}`);
console.log(`  bin chunk      ${mb(buf.readUInt32LE(20 + jsonLength))}`);

console.log(`\n  meshes ${json.meshes?.length ?? 0} | materials ${json.materials?.length ?? 0} | images ${json.images?.length ?? 0} | textures ${json.textures?.length ?? 0}`);

console.log(`\n  IMAGES`);
const broken = [];
for (const [i, image] of (json.images ?? []).entries()) {
  if (typeof image.bufferView === "number") {
    const view = json.bufferViews[image.bufferView];
    console.log(
      `    [${i}] EMBEDDED  ${pad(image.mimeType ?? "?", 12)} ${view ? mb(view.byteLength ?? 0) : "(bufferView tidak ada)"}`,
    );
  } else {
    broken.push(i);
    console.log(`    [${i}] EXTERNAL  ${image.uri ?? "(tidak ada uri, bukan bufferView)"}`);
  }
}

console.log(`\n  MATERIAL TEXTURE SLOTS`);
for (const [i, material] of (json.materials ?? []).entries()) {
  const pbr = material.pbrMetallicRoughness ?? {};
  const slots = {
    baseColor: pbr.baseColorTexture?.index,
    metallicRoughness: pbr.metallicRoughnessTexture?.index,
    normal: material.normalTexture?.index,
    emissive: material.emissiveTexture?.index,
    occlusion: material.occlusionTexture?.index,
  };
  const wired = Object.entries(slots)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}=tex${v}${broken.includes(v) ? " (BROKEN)" : ""}`);

  console.log(`    [${i}] ${pad(material.name ?? "(unnamed)", 14)} ${pad(material.type ?? "standard", 10)} ${wired.length ? wired.join(", ") : "tidak ada texture (warna polos)"}`);
}

console.log(`\n  VERDICT`);
if (broken.length > 0) {
  console.log(`    GAGAL: ${broken.length}/${json.images.length} image masih uri absolut. Texture TIDAK akan tampil.`);
  console.log(`    Perbaiki di Blender: File > External Data > Find Missing Files, lalu Pack Resources, lalu export ulang .glb.`);
} else if (!json.images?.length) {
  console.log(`    Tidak ada image sama sekali. Body akan tampil warna polos (baseColorFactor).`);
} else {
  console.log(`    OK: semua image tertanam di dalam GLB.`);
}

if (buf.length > 4 * 1024 * 1024) {
  console.log(`    PERHATIAN: ${mb(buf.length)} lewat 4 MB. Turunkan resolusi texture (maks 2048) atau ganti ke WebP.`);
}

console.log("");
