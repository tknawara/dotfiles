/** worktrunk (wt) — git worktree switching with shell integration (the
 *  `wt config shell init fish` line in config.fish). */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("worktrunk", {
  fetch: githubRelease({
    repo: "max-sixty/worktrunk",
    version: "v0.74.0",
    asset: "worktrunk-x86_64-unknown-linux-musl.tar.xz",
  }),
  install: {
    "worktrunk-x86_64-unknown-linux-musl/wt": symlink("~/.local/bin/wt"),
    "worktrunk-x86_64-unknown-linux-musl/git-wt": symlink("~/.local/bin/git-wt"),
  },
  verify: verifyBinary("worktrunk-x86_64-unknown-linux-musl/wt", ["--version"]),
});
