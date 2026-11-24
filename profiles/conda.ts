/** conda-forge environments, each one coherent solve. Launchers land in
 *  ~/.local/bin, ahead of /usr/bin — so python3, gcc, clang… are these. */
import { conda, pkg, provider } from "@gripsack/core";
import { target, type Tool } from "./lib.ts";

const systemRequirements = {
  libc: { family: "glibc" as const, version: "2.28" },
  linux: "4.18",
};

function condaTool(
  name: string,
  packages: Record<string, string>,
  commands: Record<string, string>,
  /** package commands that are not linked into ~/.local/bin */
  internal: Record<string, string> = {},
): Tool {
  return {
    name,
    viaHook: true,
    pkg: pkg(name, {
      producer: provider(conda.environment({ channels: ["conda-forge"], packages, systemRequirements })),
      commands: { ...commands, ...internal },
      target,
      layout: { kind: "prefix_materialized" },
    }),
    commands,
    files: [],
  };
}

/** CLI tools with no usable upstream binaries. */
export const cliConda = condaTool("cli-conda",
  { helix: "*", tmux: "*", htop: "*", gh: "*", bash: "*" },
  { hx: "bin/hx", tmux: "bin/tmux", htop: "bin/htop", gh: "bin/gh" },
  // the interpreter for gripsack hooks — never shadows /bin/bash
  { bash: "bin/bash" });

/** Scratch Python for one-off scripts — batteries included. */
export const python = condaTool("python", {
  python: "3.13.*",
  numpy: "*", pandas: "*", polars: "*", scipy: "*",
  httpx: "*", requests: "*", rich: "*", typer: "*",
  pyyaml: "*",
  // conda-forge yaml 0.2.6 ships libyaml-0.so.1 while pyyaml links .so.2
  yaml: "0.2.5.*", "tomli-w": "*", jinja2: "*", beautifulsoup4: "*",
  openpyxl: "*", tabulate: "*", tqdm: "*", ipython: "*", pytest: "*", ruff: "*",
}, {
  python: "bin/python", python3: "bin/python3", ipython: "bin/ipython",
  pytest: "bin/pytest", ruff: "bin/ruff",
});

/** A modern C/C++ toolchain (Ubuntu's is old).
 *  NOT deployed yet: conda's gcc pulls sysroot_linux-64, whose glibc
 *  `makedb` needs libselinux.so.1; gripsack 0.58's closure check scans every
 *  ELF in the prefix and cannot borrow it from the host (tracked upstream). */
export const cpp = condaTool("cpp", {
  gcc: "15.*", gxx: "15.*", cmake: "*", ninja: "*", make: "*",
}, {
  gcc: "bin/gcc", "g++": "bin/g++", cc: "bin/gcc", "c++": "bin/g++",
  cmake: "bin/cmake", ninja: "bin/ninja", make: "bin/make",
});
