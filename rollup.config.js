import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  external: [
    'nanoid',
    'react',
  ],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      exports: 'named',
    }
  ],
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
