import type { Config } from 'tailwindcss';
import plugin from 'flowbite/plugin';

const config: Config = {
  content: ['./src/**/*.{astro,html,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [plugin],
};

export default config;
