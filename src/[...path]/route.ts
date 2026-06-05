import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join("/")}${req.nextUrl.search}`;
  console.log(url, "url");

  const res = await fetch(url, {
    method: req.method,
    headers: {
      cookie: req.headers.get("cookie") ?? "",
      "content-type": req.headers.get("content-type") ?? "application/json",
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    redirect: "manual",
  });

  const data = await res.text();
  const response = new NextResponse(data, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });

  const setCookies = res.headers.getSetCookie?.() ?? [];
  setCookies.forEach((cookie) => response.headers.append("set-cookie", cookie));

  return response;
}

export { 
    handler as GET, 
    handler as POST, 
    handler as PUT, 
    handler as PATCH, 
    handler as DELETE 
};