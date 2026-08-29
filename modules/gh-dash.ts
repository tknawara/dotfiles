/** gh-dash — PR/issue dashboard. The release asset is a BARE binary
 *  (no archive): it stages as a single file named after the asset.
 *  Depends on gh (auth), tuicr and hunk (the keybindings in
 *  config.yml). checkout.sh ships executable — the canonical identity
 *  covers the exec bit. */
import { dep, githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("gh-dash", {
  fetch: githubRelease({
    repo: "dlvhdr/gh-dash",
    asset: "gh-dash_{version}_{os}-{arch.go}",
  }),
  install: { "gh-dash_{version}_{os}-{arch.go}": symlink("~/.local/bin/gh-dash") },
  config: tree("configs/gh-dash", "~/.config/gh-dash", "owned"),
  depends: [dep("gh"), dep("tuicr"), dep("hunk")],
    lint: "gh-dash",
  verify: verifyBinary("gh-dash_{version}_{os}-{arch.go}", ["--version"]),
});
