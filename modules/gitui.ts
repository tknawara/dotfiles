/** gitui — git TUI with the vendored Catppuccin theme + vim keys. */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("gitui", {
  fetch: githubRelease({
    repo: "gitui-org/gitui",
    version: "v0.28.1",
    asset: "gitui-linux-x86_64.tar.gz",
  }),
  install: { gitui: symlink("~/.local/bin/gitui") },
  config: tree("configs/gitui", "~/.config/gitui", "owned"),
  verify: verifyBinary("gitui", ["--version"]),
});
