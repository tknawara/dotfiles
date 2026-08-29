/** tuicr — terminal code review. Asset names carry the version WITHOUT
 *  the tag's `v` prefix; {version} in the asset pattern strips it. */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("tuicr", {
  fetch: githubRelease({
    repo: "agavra/tuicr",
    asset: "tuicr-{version}-{target}.tar.gz",
  }),
  install: { tuicr: symlink("~/.local/bin/tuicr") },
  config: { "configs/tuicr/config.toml": symlink("~/.config/tuicr/config.toml") },
    lint: "tuicr",
  verify: verifyBinary("tuicr", ["--version"]),
});
