import * as path from 'path'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginTypescript from '@rollup/plugin-typescript'
import { babel as pluginBabel } from '@rollup/plugin-babel'
import { terser as pluginTerser } from 'rollup-plugin-terser'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'

import pkg from './package.json'

const moduleName = upperFirst(camelCase(pkg.name.replace(/^@.*\//, '')))
const inputFileName = 'src/index.ts'
const browserVar = 'logger'

const banner = `
  /**
   * @license
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} License.
   */
`

export default [
  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
        banner,
        exports: 'default',
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },

  // ES Module
  {
    input: inputFileName,
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: 'inline',
        banner,
        exports: 'named',
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },

  // Browser
  {
    input: inputFileName,
    output: [
      // Uncompressed
      {
        name: browserVar,
        file: pkg.browser,
        format: 'iife',
        sourcemap: 'inline',
        banner,
      },
      // Minified
      {
        name: browserVar,
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'iife',
        sourcemap: 'inline',
        banner,
        plugins: [pluginTerser()],
      },
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      pluginBabel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: true,
      }),
    ],
  },
]
