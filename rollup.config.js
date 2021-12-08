import scss from "rollup-plugin-scss";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import path from "path";

const pathResolve = (p) => path.resolve(__dirname, p);
const name = "index";

module.exports = {
  input: "src/index.js",
  output: [
    {
      file: `dist/${name}.umd.js`,
      format: "umd",
      name: "ApprovalTree",
    },
  ],
  plugins: [
    scss({
      output: "./dist/style.css",
      failOnError: true,
    }),
    json(),
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    alias({
      "@": pathResolve("src"),
    }),
  ],
};
