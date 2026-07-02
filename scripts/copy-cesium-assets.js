import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const cesiumBuildDir = join(rootDir, "node_modules", "cesium", "Build", "Cesium");
const outputDir = join(rootDir, "public", "cesium");

if (!existsSync(cesiumBuildDir)) {
  throw new Error(`Cesium build directory not found: ${cesiumBuildDir}`);
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
cpSync(cesiumBuildDir, outputDir, { recursive: true });
