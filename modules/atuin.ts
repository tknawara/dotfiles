/** atuin — shell history search/sync. The archive nests its payload in
 *  a versionless directory. */
import { githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

const PAYLOAD = "atuin-{target}";

export default module("atuin", {
  fetch: githubRelease({
    repo: "atuinsh/atuin",
    asset: `${PAYLOAD}.tar.gz`,
  }),
  install: { [`${PAYLOAD}/atuin`]: symlink("~/.local/bin/atuin") },
  config: tree("configs/atuin", "~/.config/atuin", "owned"),
    lint: "atuin",
  verify: verifyBinary(`${PAYLOAD}/atuin`, ["--version"]),
});
