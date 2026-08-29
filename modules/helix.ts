/** helix — the editor, from conda-forge via gripsack's bundled pixi.
 *  languages.toml names pyright+ruff for Python; install them with
 *  `pixi global install pyright ruff` if you want Python LSP. */
import { module, pixi, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("helix", {
  fetch: pixi("helix", "25.07.1"),
  install: { "bin/hx": symlink("~/.local/bin/hx") },
  config: tree("configs/helix", "~/.config/helix", "owned"),
  verify: verifyBinary("bin/hx", ["--version"]),
});
