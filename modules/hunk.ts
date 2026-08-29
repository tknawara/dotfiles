/** hunk — the diff pager gh-dash renders through. The release calls
 *  the asset `hunkdiff`; the binary inside is `hunk`. */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("hunk", {
  fetch: githubRelease({
    repo: "modem-dev/hunk",
    asset: "hunkdiff-linux-x64.tar.gz", // upstream says "x64" — deliberately not a placeholder (0016 §D1)
  }),
  install: { "hunkdiff-linux-x64/hunk": symlink("~/.local/bin/hunk") },
  verify: verifyBinary("hunkdiff-linux-x64/hunk", ["--version"]),
});
