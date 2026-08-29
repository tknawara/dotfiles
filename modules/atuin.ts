/** atuin — shell history search/sync. The archive nests its payload in
 *  a versionless directory. */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("atuin", {
  fetch: githubRelease({
    repo: "atuinsh/atuin",
    asset: "atuin-{target}.tar.gz",
  }),
  install: { "atuin-{target}/atuin": symlink("~/.local/bin/atuin") },
  config: tree("configs/atuin", "~/.config/atuin", "owned"),
    lint: "atuin",
  verify: verifyBinary("atuin-{target}/atuin", ["--version"]),
});
