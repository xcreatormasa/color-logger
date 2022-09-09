import * as path from 'path'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginTypescript from '@rollup/plugin-typescript'
import { babel as pluginBabel } from '@rollup/plugin-babel'
import { terser as pluginTerser } from 'rollup-plugin-terser'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'

import packageJson from './package.json'

const moduleName = upperFirst(camelCase(packageJson.name.replace(/^@.*\//, '')))
const name = 'logger' // Variable name for browser
const inputFileName = 'src/index.ts'

const banner = `
  /**
   * @license
   * ${moduleName}.js v${packageJson.version}
   * Released under the ${packageJson.license} License.
   */
`

export default {
  input: inputFileName,
  output: [
    {
      name: name,
      file: packageJson.main,
      format: 'umd',
      sourcemap: 'inline',
      banner,
      exports: 'default',
      globals: {},
    },
    {
      name: name,
      file: packageJson.main.replace('.js', '.min.js'),
      format: 'umd',
      sourcemap: 'inline',
      banner,
      exports: 'default',
      globals: {},
      plugins: [pluginTerser()],
    },
  ],
  external: [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})],
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
