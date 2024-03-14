import path from "path";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solid()],
  resolve: {
    conditions: ["development", "browser"],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "/src/index.ts"),
      name: "flowbite-solid",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es" ? `flowbite-solid.mjs` : `flowbite-solid.cjs`,
    },
    rollupOptions: {
      external: ["solid-js", "flowbite", "solid-heroicons", "tailwind-merge"],
      output: {
        globals: {
          ["solid-js"]: "solidJs",
          ["flowbite"]: "flowbite",
          ["solid-heroicons"]: "solid-heroicons",
          ["tailwind-merge"]: "tailwindMerge",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    pool: "forks",
    poolOptions: {
      forks: {
        isolate: false,
      },
    },
    deps: {
      optimizer: {
        web: {
          exclude: ["solid-js"],
        },
      },
    },
  },
});
