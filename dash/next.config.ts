import type { NextConfig } from "next";

import pack from "./package.json" with { type: "json" };

import "@/env";

// Build output mode can be overridden by NEXT_BUILD_OUTPUT env (e.g. 'export' or 'standalone')
const _buildOutput = process.env.NEXT_BUILD_OUTPUT;
const output: "standalone" | "export" | undefined = _buildOutput === "export" ? "export" : process.env.NEXT_STANDALONE === "1" ? "standalone" : undefined;
const compress = process.env.NEXT_NO_COMPRESS === "1";

// const frameDisableHeaders = [
// 	{
// 		source: "/(.*)",
// 		headers: [
// 			{
// 				type: "header",
// 				key: "X-Frame-Options",
// 				value: "SAMEORIGIN",
// 			},
// 			{
// 				type: "header",
// 				key: "Content-Security-Policy",
// 				value: "frame-ancestors 'self';",
// 			},
// 		],
// 	},
// ];

const config: NextConfig = {
	output,
	compress,
	env: {
		version: pack.version,
	},
	// headers: async () => frameDisableHeaders,
};

export default config;
