/** tuicr — terminal code review. Asset names carry the version WITHOUT
 *  the tag's `v` prefix; {version} in the asset pattern strips it. */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("tuicr", {
  fetch: githubRelease({
    repo: "agavra/tuicr",
    version: "v0.22.0",
    asset: "tuicr-{version}-x86_64-unknown-linux-musl.tar.gz",
  }),
  install: { tuicr: symlink("~/.local/bin/tuicr") },
  config: { "configs/tuicr/config.toml": symlink("~/.config/tuicr/config.toml") },
  verify: verifyBinary("tuicr", ["--version"]),
});
