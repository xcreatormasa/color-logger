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

export default {
  input: inputFileName,
  output: [
    {
      name: browserVar,
      file: pkg.main,
      format: 'umd',
      sourcemap: 'inline',
      banner,
      exports: 'default',
      globals: {},
    },
    {
      name: browserVar,
      file: pkg.main.replace('.js', '.min.js'),
      format: 'umd',
      sourcemap: 'inline',
      banner,
      exports: 'default',
      globals: {},
      plugins: [pluginTerser()],
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
}
