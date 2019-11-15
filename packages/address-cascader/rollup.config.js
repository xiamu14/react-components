import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

import pkg from "./package.json";

export default [
  {
    input: "src/china_divisions/index.ts",
    output: [
      {
        file: "dist/china_divisions/index.js",
        format: "cjs",
        exports: "named",
        sourcemap: true
      },
      {
        file: "dist/china_divisions/index.es.js",
        format: "es",
        exports: "named",
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      url(),
      resolve(),
      typescript({
        rollupCommonJSResolveHack: true,
        clean: true,
        tsconfigOverride: {
          compilerOptions: { declaration: false }
        }
      }),
      commonjs()
    ]
  },
  {
    input: "src/index.tsx",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      postcss({
        modules: true
      }),
      url(),
      svgr(),
      resolve(),
      typescript({
        rollupCommonJSResolveHack: true,
        clean: true
      }),
      commonjs()
    ]
  }
];
