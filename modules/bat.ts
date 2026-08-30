/** bat — a better cat. The archive nests its payload in a
 *  tag-versioned directory, so both the asset and the install key use
 *  {version} — `grip update bat` keeps working. */
import { githubRelease, module, symlink, verifyBinary } from "@gripsack/core";

// the nested payload dir, once — asset, install, and verify all read it
const PAYLOAD = "bat-{version}-{target}";

export default module("bat", {
  fetch: githubRelease({
    repo: "sharkdp/bat",
    asset: `${PAYLOAD}.tar.gz`,
  }),
  install: { [`${PAYLOAD}/bat`]: symlink("~/.local/bin/bat") },
  config: { "configs/bat/config": symlink("~/.config/bat/config") },
  verify: verifyBinary(`${PAYLOAD}/bat`, ["--version"]),
});
