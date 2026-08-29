/** starship — the prompt. Bare binary at the archive root; config is
 *  owned (starship never writes it). */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("starship", {
  fetch: githubRelease({
    repo: "starship/starship",
    asset: "starship-x86_64-unknown-linux-musl.tar.gz",
  }),
  install: { starship: symlink("~/.local/bin/starship") },
  config: { "configs/starship/starship.toml": symlink("~/.config/starship/starship.toml") },
  verify: verifyBinary("starship", ["--version"]),
});
