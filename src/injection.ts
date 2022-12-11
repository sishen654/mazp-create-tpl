interface Injection {
  [prop: string]: Record<string, any>
}
const changeObj: Injection = {
  "test": {
    "vite.config": {
      "__TEST__": `test: {
        globals: true,
        include: ["./__test__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        environment: "happy-dom",
      },`,
      "-D": ["happy-dom 6.0.4", "vitest ^0.24.3"],
      "TS": {
        "compilerOptions": {
          "types": ["vitest/globals"],
        },
        "include": ["__test__"],
        "-D": ["@types/node 18.7.23"],
      }
    },
  }
}

export default changeObj
