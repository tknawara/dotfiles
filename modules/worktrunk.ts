/** worktrunk (wt) — git worktree switching with shell integration (the
 *  `wt config shell init fish` line in config.fish). */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("worktrunk", {
  fetch: githubRelease({
    repo: "max-sixty/worktrunk",
    asset: "worktrunk-{target}.tar.xz",
  }),
  install: {
    "worktrunk-{target}/wt": symlink("~/.local/bin/wt"),
    "worktrunk-{target}/git-wt": symlink("~/.local/bin/git-wt"),
  },
  verify: verifyBinary("worktrunk-{target}/wt", ["--version"]),
});
