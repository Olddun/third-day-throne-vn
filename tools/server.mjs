import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "web");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
};

createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const cleanPath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, cleanPath === "/" ? "index.html" : cleanPath);
  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  if (statSync(filePath).isDirectory()) filePath = join(filePath, "index.html");
  res.writeHead(200, {
    "Content-Type": types[extname(filePath)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Third Day Throne VN running at http://127.0.0.1:${port}/`);
});
