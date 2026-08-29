/** yazi — terminal file manager. `.zip` asset, nested payload; the
 *  theme is a hand-ported Catppuccin (theme.toml + the tmTheme it
 *  references, both owned). */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("yazi", {
  fetch: githubRelease({
    repo: "sxyazi/yazi",
    asset: "yazi-{target}.zip",
  }),
  install: {
    "yazi-{target}/yazi": symlink("~/.local/bin/yazi"),
    "yazi-{target}/ya": symlink("~/.local/bin/ya"),
  },
  config: tree("configs/yazi", "~/.config/yazi", "owned"),
    lint: "yazi",
  verify: verifyBinary("yazi-{target}/yazi", ["--version"]),
});
