import { createRequire as h } from "node:module";
import y from "@rollup/plugin-inject";
import _ from "node-stdlib-browser";
import { handleCircularDependancyWarning as B } from "node-stdlib-browser/helpers/rollup/plugin";
import x from "node-stdlib-browser/helpers/esbuild/plugin";
const c = (s, l) => b(s) === b(l), e = (s, l) => s ? s === !0 ? !0 : s === l : !1, T = (s) => s.startsWith("node:"), $ = (s) => {
  const l = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${l}$`);
}, b = (s) => s.replace(/^node:/, ""), u = {
  buffer: [
    "import __buffer_polyfill from 'vite-plugin-node-polyfills/shims/buffer'",
    "globalThis.Buffer = globalThis.Buffer || __buffer_polyfill"
  ],
  global: [
    "import __global_polyfill from 'vite-plugin-node-polyfills/shims/global'",
    "globalThis.global = globalThis.global || __global_polyfill"
  ],
  process: [
    "import __process_polyfill from 'vite-plugin-node-polyfills/shims/process'",
    "globalThis.process = globalThis.process || __process_polyfill"
  ]
}, w = (s = {}) => {
  const l = {
    include: [],
    exclude: [],
    overrides: {},
    protocolImports: !0,
    ...s,
    globals: {
      Buffer: !0,
      global: !0,
      process: !0,
      ...s.globals
    }
  }, d = (o) => l.include.length > 0 ? !l.include.some((r) => c(o, r)) : l.exclude.some((r) => c(o, r)), m = (o) => {
    if (e(l.globals.Buffer, "dev") && /^buffer$/.test(o))
      return "vite-plugin-node-polyfills/shims/buffer";
    if (e(l.globals.global, "dev") && /^global$/.test(o))
      return "vite-plugin-node-polyfills/shims/global";
    if (e(l.globals.process, "dev") && /^process$/.test(o))
      return "vite-plugin-node-polyfills/shims/process";
    if (o in l.overrides)
      return l.overrides[o];
  }, g = Object.entries(_).reduce((o, [r, i]) => (!l.protocolImports && T(r) || d(r) || (o[r] = m(b(r)) || i), o), {}), p = h(import.meta.url), f = [
    ...e(l.globals.Buffer, "dev") ? [p.resolve("vite-plugin-node-polyfills/shims/buffer")] : [],
    ...e(l.globals.global, "dev") ? [p.resolve("vite-plugin-node-polyfills/shims/global")] : [],
    ...e(l.globals.process, "dev") ? [p.resolve("vite-plugin-node-polyfills/shims/process")] : []
  ], a = [
    ...e(l.globals.Buffer, "dev") ? u.buffer : [],
    ...e(l.globals.global, "dev") ? u.global : [],
    ...e(l.globals.process, "dev") ? u.process : [],
    ""
  ].join(`
`);
  return {
    name: "vite-plugin-node-polyfills",
    config: (o, r) => {
      const i = r.command === "serve";
      return {
        build: {
          rollupOptions: {
            onwarn: (t, n) => {
              B(t, () => {
                if (o.build?.rollupOptions?.onwarn)
                  return o.build.rollupOptions.onwarn(t, n);
                n(t);
              });
            },
            plugins: [
              {
                ...y({
                  // https://github.com/niksy/node-stdlib-browser/blob/3e7cd7f3d115ac5c4593b550e7d8c4a82a0d4ac4/README.md#vite
                  ...e(l.globals.Buffer, "build") ? { Buffer: "vite-plugin-node-polyfills/shims/buffer" } : {},
                  ...e(l.globals.global, "build") ? { global: "vite-plugin-node-polyfills/shims/global" } : {},
                  ...e(l.globals.process, "build") ? { process: "vite-plugin-node-polyfills/shims/process" } : {}
                })
              }
            ]
          }
        },
        esbuild: {
          // In dev, the global polyfills need to be injected as a banner in order for isolated scripts (such as Vue SFCs) to have access to them.
          banner: i ? a : void 0
        },
        optimizeDeps: {
          exclude: [
            ...f
          ],
          esbuildOptions: {
            banner: i ? { js: a } : void 0,
            // https://github.com/niksy/node-stdlib-browser/blob/3e7cd7f3d115ac5c4593b550e7d8c4a82a0d4ac4/README.md?plain=1#L203-L209
            define: {
              ...i && e(l.globals.Buffer, "dev") ? { Buffer: "Buffer" } : {},
              ...i && e(l.globals.global, "dev") ? { global: "global" } : {},
              ...i && e(l.globals.process, "dev") ? { process: "process" } : {}
            },
            inject: [
              ...f
            ],
            plugins: [
              x(g),
              // Supress the 'injected path "..." cannot be marked as external' error in Vite 4 (emitted by esbuild).
              // https://github.com/evanw/esbuild/blob/edede3c49ad6adddc6ea5b3c78c6ea7507e03020/internal/bundler/bundler.go#L1469
              {
                name: "vite-plugin-node-polyfills-shims-resolver",
                setup(t) {
                  for (const n of f) {
                    const v = $(n);
                    t.onResolve({ filter: v }, () => ({
                      // https://github.com/evanw/esbuild/blob/edede3c49ad6adddc6ea5b3c78c6ea7507e03020/internal/bundler/bundler.go#L1468
                      external: !1,
                      path: n
                    }));
                  }
                }
              }
            ]
          }
        },
        resolve: {
          // https://github.com/niksy/node-stdlib-browser/blob/3e7cd7f3d115ac5c4593b550e7d8c4a82a0d4ac4/README.md?plain=1#L150
          alias: {
            ...g
          }
        }
      };
    }
  };
};
export {
  w as nodePolyfills
};
//# sourceMappingURL=index.js.map
