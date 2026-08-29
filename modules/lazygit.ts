/** lazygit — git TUI. goreleaser naming: full version + {os}_{arch}. */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("lazygit", {
  fetch: githubRelease({
    repo: "jesseduffield/lazygit",
    asset: "lazygit_{version}_{os}_{arch}.tar.gz",
  }),
  install: { lazygit: symlink("~/.local/bin/lazygit") },
  config: { "configs/lazygit/config.yml": symlink("~/.config/lazygit/config.yml") },
  verify: verifyBinary("lazygit", ["--version"]),
});
