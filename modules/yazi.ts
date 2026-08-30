/** yazi — terminal file manager. `.zip` asset, nested payload; the
 *  theme is a hand-ported Catppuccin (theme.toml + the tmTheme it
 *  references, both owned). */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

const PAYLOAD = "yazi-{target}";

export default module("yazi", {
  fetch: githubRelease({
    repo: "sxyazi/yazi",
    asset: `${PAYLOAD}.zip`,
  }),
  install: {
    [`${PAYLOAD}/yazi`]: symlink("~/.local/bin/yazi"),
    [`${PAYLOAD}/ya`]: symlink("~/.local/bin/ya"),
  },
  config: tree("configs/yazi", "~/.config/yazi", "owned"),
    lint: "yazi",
  verify: verifyBinary(`${PAYLOAD}/yazi`, ["--version"]),
});
