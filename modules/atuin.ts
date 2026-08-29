/** atuin — shell history search/sync. The archive nests its payload in
 *  a versionless directory. */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("atuin", {
  fetch: githubRelease({
    repo: "atuinsh/atuin",
    asset: "atuin-x86_64-unknown-linux-musl.tar.gz",
  }),
  install: { "atuin-x86_64-unknown-linux-musl/atuin": symlink("~/.local/bin/atuin") },
  config: tree("configs/atuin", "~/.config/atuin", "owned"),
  verify: verifyBinary("atuin-x86_64-unknown-linux-musl/atuin", ["--version"]),
});
