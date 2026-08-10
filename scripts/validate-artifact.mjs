import { access, readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const workerPath = fileURLToPath(new URL("../dist/server/index.js", import.meta.url));
const hostingPath = fileURLToPath(new URL("../dist/.openai/hosting.json", import.meta.url));

await Promise.all([access(workerPath), access(hostingPath)]);
JSON.parse(await readFile(hostingPath, "utf8"));

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);

if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error(
    "dist/server/index.js must have an ESM default export with fetch(request, env, ctx)",
  );
}

console.log(
  "Validated Sites artifact: ESM Worker default.fetch and hosting manifest are present.",
);
