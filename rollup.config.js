import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
  entry: 'src/js/index.js',
  dest: 'main.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    babel({
      babelrc: false,
      exclude: [
        'node_modules/**',
        'src/css/**',
      ],
      presets: [ [ 'es2015', { modules: false } ], 'react' ],
      // presets: [ 'react' ],
      plugins: [
        'external-helpers',
        // 'react-html-attrs',
        'syntax-object-rest-spread',
        'transform-object-rest-spread',
      ],
    }),
    commonjs({
      exclude: 'node_modules/process-es6/**',
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': [
          'PropTypes',
          'createElement',
          'Children',
          'Component',
        ],
      },
    }),
    nodeResolve({
      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano(),
      ],
      extensions: [ '.css' ],
    }),
  ],
};
