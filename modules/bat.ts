/** bat — a better cat. The archive nests its payload in a
 *  tag-versioned directory, so both the asset and the install key use
 *  {version} — `grip update bat` keeps working. */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

export default module("bat", {
  fetch: githubRelease({
    repo: "sharkdp/bat",
    asset: "bat-{version}-x86_64-unknown-linux-musl.tar.gz",
  }),
  install: { "bat-{version}-x86_64-unknown-linux-musl/bat": symlink("~/.local/bin/bat") },
  config: { "configs/bat/config": symlink("~/.config/bat/config") },
  verify: verifyBinary("bat-{version}-x86_64-unknown-linux-musl/bat", ["--version"]),
});
