/** yazi — terminal file manager. `.zip` asset, nested payload; the
 *  theme is a hand-ported Catppuccin (theme.toml + the tmTheme it
 *  references, both owned). */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("yazi", {
  fetch: githubRelease({
    repo: "sxyazi/yazi",
    asset: "yazi-x86_64-unknown-linux-musl.zip",
  }),
  install: {
    "yazi-x86_64-unknown-linux-musl/yazi": symlink("~/.local/bin/yazi"),
    "yazi-x86_64-unknown-linux-musl/ya": symlink("~/.local/bin/ya"),
  },
  config: tree("configs/yazi", "~/.config/yazi", "owned"),
  verify: verifyBinary("yazi-x86_64-unknown-linux-musl/yazi", ["--version"]),
});
