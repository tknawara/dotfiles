/** worktrunk (wt) — git worktree switching with shell integration (the
 *  `wt config shell init fish` line in config.fish). */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

const PAYLOAD = "worktrunk-{target}";

export default module("worktrunk", {
  fetch: githubRelease({
    repo: "max-sixty/worktrunk",
    asset: `${PAYLOAD}.tar.xz`,
  }),
  install: {
    [`${PAYLOAD}/wt`]: symlink("~/.local/bin/wt"),
    [`${PAYLOAD}/git-wt`]: symlink("~/.local/bin/git-wt"),
  },
  verify: verifyBinary(`${PAYLOAD}/wt`, ["--version"]),
});
