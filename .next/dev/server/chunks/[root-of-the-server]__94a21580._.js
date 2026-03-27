module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/session/session.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_COOKIE_NAME",
    ()=>SESSION_COOKIE_NAME,
    "resolveSession",
    ()=>resolveSession
]);
const SESSION_COOKIE_NAME = "iis_session";
function buildSessionCookie(value) {
    const parts = [
        `${SESSION_COOKIE_NAME}=${encodeURIComponent(value)}`,
        "Path=/",
        "HttpOnly",
        "SameSite=Lax",
        ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ""
    ].filter(Boolean);
    return parts.join("; ");
}
async function resolveSession(request) {
    const existing = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (existing && existing.length > 8) {
        return {
            sessionId: existing
        };
    }
    const sessionId = crypto.randomUUID();
    return {
        sessionId,
        setCookieHeader: buildSessionCookie(sessionId)
    };
}
}),
"[project]/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2f$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session/session.ts [middleware] (ecmascript)");
;
;
/** §12.2 — reject browser cross-origin API calls unless origin is allowlisted. */ function crossOriginApiBlocked(request) {
    if (!request.nextUrl.pathname.startsWith("/api")) return null;
    const origin = request.headers.get("origin");
    if (!origin) return null;
    const self = request.nextUrl.origin;
    const allowed = new Set([
        self
    ]);
    const extra = process.env.CORS_ALLOWED_ORIGINS?.split(",").map((s)=>s.trim()).filter(Boolean);
    if (extra) for (const o of extra)allowed.add(o);
    if (allowed.has(origin)) return null;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: {
            code: "CORS_FORBIDDEN",
            message: "Cross-origin API access is not allowed for this origin.",
            recoveryGuidance: "Use the app from the same origin, or set CORS_ALLOWED_ORIGINS for trusted browser origins when self-hosting.",
            details: {
                origin
            }
        }
    }, {
        status: 403
    });
}
function proxy(request) {
    const blocked = crossOriginApiBlocked(request);
    if (blocked) return blocked;
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (!request.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2f$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["SESSION_COOKIE_NAME"])?.value) {
        res.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2f$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["SESSION_COOKIE_NAME"], crypto.randomUUID(), {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 400
        });
    }
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    if (request.nextUrl.protocol === "https:") {
        res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    }
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
    ].join("; ");
    res.headers.set("Content-Security-Policy", csp);
    return res;
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__94a21580._.js.map