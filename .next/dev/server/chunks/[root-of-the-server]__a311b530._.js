module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Projects/instructional-integrity-ui/lib/rubric.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "currentRubric",
    ()=>currentRubric
]);
const currentRubric = {
    version: "v1",
    criteria: [
        {
            id: "intent_preserved",
            name: "Intent Preserved",
            description: "The artifact states the objective early and does not drift into unrelated goals."
        },
        {
            id: "assumptions_visible",
            name: "Assumptions Visible",
            description: "Assumptions and prerequisites are explicitly named and scoped."
        },
        {
            id: "sequencing_stable",
            name: "Sequencing Stable",
            description: "Steps are ordered clearly, no dependent actions are collapsed, and transitions are explicit."
        },
        {
            id: "language_accessible",
            name: "Language Accessible",
            description: "The wording is concrete, avoids dense jargon, and is accessible to the intended audience."
        },
        {
            id: "neurodivergent_safe",
            name: "Neurodivergent Safe",
            description: "Content is chunked, predictable, and avoids overwhelming or ambiguous constructions."
        }
    ]
};
}),
"[project]/Projects/instructional-integrity-ui/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Projects/instructional-integrity-ui/node_modules/@prisma/client)");
;
const prisma = global.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        "error",
        "warn"
    ]
});
if ("TURBOPACK compile-time truthy", 1) {
    global.prisma = prisma;
}
}),
"[project]/Projects/instructional-integrity-ui/lib/evaluator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runEvaluation",
    ()=>runEvaluation,
    "runEvaluationPersisted",
    ()=>runEvaluationPersisted
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$rubric$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/instructional-integrity-ui/lib/rubric.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/instructional-integrity-ui/lib/db.ts [app-route] (ecmascript)");
;
;
function mockGradeForCriterion(id) {
    if (id === "intent_preserved" || id === "sequencing_stable" || id === "language_accessible") {
        return "PASS";
    }
    if (id === "assumptions_visible" || id === "neurodivergent_safe") {
        return "WARN";
    }
    return "FAIL";
}
function mockNextAction(id) {
    switch(id){
        case "intent_preserved":
            return "Keep the objective statement, but consider adding a concrete outcome at the top.";
        case "assumptions_visible":
            return "Add a short section that names what the learner is expected to already know or have done.";
        case "sequencing_stable":
            return "Review the steps and ensure each action depends only on information already established.";
        case "language_accessible":
            return "Swap any dense phrases for concrete verbs and examples that match your audience.";
        case "neurodivergent_safe":
            return "Split long paragraphs into smaller task units with clear headings or bullet points.";
        default:
            return "Revise this section to better align with the framework.";
    }
}
async function runEvaluation(input) {
    const rubricVersion = input.rubricVersion ?? __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$rubric$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["currentRubric"].version;
    const criteriaResults = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$rubric$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["currentRubric"].criteria.map((criterion)=>{
        const grade = mockGradeForCriterion(criterion.id);
        return {
            id: criterion.id,
            criterion: criterion.name,
            grade,
            rationale: criterion.description,
            nextAction: mockNextAction(criterion.id)
        };
    });
    const worstGradePriority = {
        FAIL: 3,
        WARN: 2,
        PASS: 1
    };
    const overallGrade = criteriaResults.reduce((current, result)=>{
        return worstGradePriority[result.grade] > worstGradePriority[current] ? result.grade : current;
    }, "PASS");
    return {
        rubricVersion,
        overallGrade,
        criteria: criteriaResults
    };
}
async function runEvaluationPersisted(input) {
    const evaluation = await runEvaluation({
        artifactText: input.artifactText,
        rubricVersion: input.rubricVersion
    });
    const artifact = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].artifact.create({
        data: {
            ownerId: input.userId,
            title: input.title,
            rawText: input.artifactText,
            sourceType: input.sourceType === "paste" ? "PASTE" : "UPLOAD",
            mimeType: input.mimeType ?? undefined
        }
    });
    const runRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].evaluationRun.create({
        data: {
            artifactId: artifact.id,
            userId: input.userId,
            rubricVersion: evaluation.rubricVersion,
            status: "COMPLETED",
            overallGrade: evaluation.overallGrade,
            completedAt: new Date()
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(evaluation.criteria.map((criterion)=>__TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].criterionResult.create({
            data: {
                evaluationRunId: runRecord.id,
                invariantId: criterion.id,
                criterionName: criterion.criterion,
                grade: criterion.grade,
                rationale: criterion.rationale,
                nextAction: criterion.nextAction
            }
        })));
    const run = {
        id: runRecord.id,
        artifactId: runRecord.artifactId,
        userId: runRecord.userId,
        rubricVersion: runRecord.rubricVersion,
        status: runRecord.status.toLowerCase(),
        createdAt: runRecord.createdAt.toISOString(),
        completedAt: runRecord.completedAt ? runRecord.completedAt.toISOString() : null,
        overallGrade: runRecord.overallGrade
    };
    return {
        run,
        criteria: evaluation.criteria
    };
}
}),
"[project]/Projects/instructional-integrity-ui/app/api/evaluator/run/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/instructional-integrity-ui/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$evaluator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/instructional-integrity-ui/lib/evaluator.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    const startedAt = Date.now();
    try {
        const body = await request.json();
        const artifactText = typeof body.artifactText === "string" ? body.artifactText.trim() : "";
        if (!artifactText) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "artifactText is required"
            }, {
                status: 400
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$lib$2f$evaluator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runEvaluationPersisted"])({
            artifactText,
            rubricVersion: typeof body.rubricVersion === "string" ? body.rubricVersion : undefined,
            userId: "anonymous-user",
            sourceType: "paste"
        });
        const durationMs = Date.now() - startedAt;
        console.log(JSON.stringify({
            event: "evaluation_run_completed",
            durationMs,
            rubricVersion: result.run.rubricVersion,
            overallGrade: result.run.overallGrade,
            criteriaCount: result.criteria.length
        }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result, {
            status: 200
        });
    } catch (error) {
        const durationMs = Date.now() - startedAt;
        console.error(JSON.stringify({
            event: "evaluation_run_error",
            durationMs,
            error: error instanceof Error ? error.message : "Unknown error"
        }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$instructional$2d$integrity$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to run evaluator"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a311b530._.js.map