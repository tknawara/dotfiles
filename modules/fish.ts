/** fish — friendly interactive shell. Static binary from the GitHub
 *  release; note the tag has no `v` prefix, and the archive holds one
 *  bare `fish` binary. */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("fish", {
  fetch: githubRelease({
    repo: "fish-shell/fish-shell",
    version: "4.8.1",
    asset: "fish-{version}-linux-x86_64.tar.xz",
  }),
  install: { fish: symlink("~/.local/bin/fish") },
  config: tree("configs/fish", "~/.config/fish", "owned"),
  verify: verifyBinary("fish", ["--version"]),
});
