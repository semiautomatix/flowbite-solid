import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
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
});
