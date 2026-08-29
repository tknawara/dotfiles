/** herdr — replaces the old curl-and-pray install.sh: same GitHub
 *  release, but pinned by the lockfile and hash-verified by the core.
 *  The asset is a bare binary (no archive). */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("herdr", {
  fetch: githubRelease({
    repo: "herdrdev/herdr",
    asset: "herdr-{os}-{arch}",
  }),
  install: { "herdr-{os}-{arch}": symlink("~/.local/bin/herdr") },
  verify: verifyBinary("herdr-{os}-{arch}", ["--version"]),
});
