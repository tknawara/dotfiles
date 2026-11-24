/** tarek's whole terminal environment. `grip check && grip plan && grip apply`. */
import {
  artifact, bash, defineWorkspace, hook, packageCommand, profile, runBash, workspace,
} from "@gripsack/core";
import { binLinks, copy, link, linkTree, type Tool } from "./profiles/lib.ts";
import { tools } from "./profiles/tools.ts";
import { cliConda, python } from "./profiles/conda.ts";
import { flyline, tpm } from "./profiles/shell.ts";

const all: Tool[] = [...tools, cliConda, python, flyline, tpm];

// conda commands get 2-line exec wrappers pointing into their realized prefix
// (not copies: $ORIGIN rpaths and relative runtime dirs keep working). The
// wrapper also keeps Python's bytecode out of the store, whoever calls it.
const prefixLinks = Object.fromEntries(all.filter((t) => t.viaHook).flatMap((t) =>
  Object.entries(t.commands).map(([cmd, path]) => [`LINK_${cmd}`, artifact(t.name, path)])));
const condaLinks = hook("conda-links", {
  trigger: "post_link",
  run: runBash({
    interpreter: packageCommand("cli-conda", "bash"),
    env: prefixLinks,
    body: bash`
      bin="$HOME/.local/bin"
      mkdir -p "$bin"
      for v in $(compgen -v LINK_); do
        dest="$bin/\${v#LINK_}"
        rm -f "$dest"
        printf '#!/bin/sh\nexport PYTHONPYCACHEPREFIX="\${PYTHONPYCACHEPREFIX:-$HOME/.cache/python}"\nexec %q "$@"\n' "\${!v}" >"$dest"
        chmod 755 "$dest"
      done
    `,
  }),
});

export default defineWorkspace(() => workspace({
  outputs: [
    ...all.map((t) => t.pkg),
    condaLinks,
    profile("personal", {
      hooks: ["conda-links"],
      files: [
        ...all.flatMap(binLinks),
        ...all.flatMap((t) => t.files),
        linkTree("configs/helix", "~/.config/helix"),
        // Claude Code rewrites settings.json itself → tracked copy, drift is reported
        copy("configs/claude/settings.json", "~/.claude/settings.json"),
        link("configs/claude/statusline.sh", "~/.claude/statusline.sh"),
        // Windows side (WSL): oh-my-posh theme for PowerShell
        copy("configs/powershell/retro-amber.omp.json", "/mnt/c/Users/tarek/.poshthemes/retro-amber.omp.json"),
      ],
    }),
  ],
}));
