import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const czmlDir = join(process.cwd(), "public", "czml");
const czmlFiles = readdirSync(czmlDir)
  .filter((fileName) => fileName.endsWith(".czml"))
  .sort();

const manifest = czmlFiles.map((fileName) => ({
  name: fileName.replace(/\.czml$/, ""),
  path: `/czml/${fileName}`,
}));

writeFileSync(
  join(czmlDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
