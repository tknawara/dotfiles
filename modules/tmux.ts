/** tmux from conda-forge (no upstream binary releases). TPM is its own
 *  module (modules/tpm.ts); first tmux launch installs plugins with
 *  prefix + I. */
import { dep, module, pixi, symlink, verifyBinary } from "@gripsack/core";

export default module("tmux", {
  fetch: pixi("tmux"),
  install: { "bin/tmux": symlink("~/.local/bin/tmux") },
  config: { "configs/tmux/tmux.conf": symlink("~/.config/tmux/tmux.conf") },
  depends: [dep("tpm")],
  verify: verifyBinary("bin/tmux", ["-V"]),
});
