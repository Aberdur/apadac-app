import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const targets = [
  path.join(projectRoot, "node_modules/payload/dist/auth/cookies.js"),
  path.join(projectRoot, "node_modules/payload/dist/utilities/parseCookies.js"),
  path.join(projectRoot, "node_modules/payload/dist/utilities/createPayloadRequest.js"),
  path.join(projectRoot, "node_modules/@payloadcms/next/dist/utilities/initReq.js"),
];

const replacements = [
  {
    from: "const cookie = headers.get('Cookie');",
    to: "const cookie = headers.get('Cookie') ?? headers.get('cookie');",
  },
  {
    from: "const rc = headers.get('Cookie');",
    to: "const rc = headers.get('Cookie') ?? headers.get('cookie');",
  },
  {
    from: "    const { config } = payload;\n    const localization = config.localization;\n",
    to:
      "    const { config } = payload;\n" +
      "    const tokenFromCookie = cookies.get(`${config.cookiePrefix}-token`);\n" +
      "    if (!request.headers.get('Authorization') && tokenFromCookie) {\n" +
      "        const headersWithAuth = new Headers(request.headers);\n" +
      "        headersWithAuth.set('Authorization', `Bearer ${tokenFromCookie}`);\n" +
      "        request = new Request(request, {\n" +
      "            headers: headersWithAuth\n" +
      "        });\n" +
      "    }\n" +
      "    const localization = config.localization;\n",
  },
  {
    from:
      "  const headers = await getHeaders();\n" +
      "  const cookies = parseCookies(headers);\n" +
      "  const partialResult = await partialReqCache.get(async () => {\n",
    to:
      "  const headers = new Headers(await getHeaders());\n" +
      "  const cookies = parseCookies(headers);\n" +
      "  const tokenFromCookie = cookies.get('payload-token');\n" +
      "  if (!headers.get('Authorization') && tokenFromCookie) {\n" +
      "    headers.set('Authorization', `Bearer ${tokenFromCookie}`);\n" +
      "  }\n" +
      "  const partialResult = await partialReqCache.get(async () => {\n",
  },
];

let patchedFiles = 0;

for (const target of targets) {
  if (!fs.existsSync(target)) {
    console.warn(`[patch-payload-cookie-case] Skipping missing file: ${target}`);
    continue;
  }

  const original = fs.readFileSync(target, "utf8");
  let next = original;

  for (const { from, to } of replacements) {
    next = next.replace(from, to);
  }

  if (next !== original) {
    fs.writeFileSync(target, next);
    patchedFiles += 1;
    console.log(`[patch-payload-cookie-case] Patched ${path.relative(projectRoot, target)}`);
  } else {
    console.log(`[patch-payload-cookie-case] No changes needed in ${path.relative(projectRoot, target)}`);
  }
}

if (patchedFiles === 0) {
  console.log("[patch-payload-cookie-case] Completed with no file modifications.");
}
