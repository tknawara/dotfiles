/** TPM — the tmux plugin manager, as a pinned git clone deployed as one
 *  owned symlink: a whole directory as a destination. First tmux launch
 *  installs plugins with prefix + I. */
import { git, module, symlink } from "@gripsack/core";

export default module("tpm", {
  fetch: git(
    "https://github.com/tmux-plugins/tpm",
    "e261deb1b47614eed3400089ce7197dc68acc4eb",
  ),
  // an empty `from` is the payload root — the whole clone, linked
  install: { "": symlink("~/.config/tmux/plugins/tpm") },
});
