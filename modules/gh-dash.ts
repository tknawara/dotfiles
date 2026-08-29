/** gh-dash — PR/issue dashboard. The release asset is a BARE binary
 *  (no archive): it stages as a single file named after the asset.
 *  Depends on gh (auth), tuicr and hunk (the keybindings in
 *  config.yml). checkout.sh ships executable — the canonical identity
 *  covers the exec bit. */
import { dep, githubRelease, module, symlink, tree, verifyBinary } from "@gripsack/core";

export default module("gh-dash", {
  fetch: githubRelease({
    repo: "dlvhdr/gh-dash",
    version: "v4.25.2",
    asset: "gh-dash_{version}_linux-amd64",
  }),
  install: { "gh-dash_{version}_linux-amd64": symlink("~/.local/bin/gh-dash") },
  config: tree("configs/gh-dash", "~/.config/gh-dash", "owned"),
  depends: [dep("gh"), dep("tuicr"), dep("hunk")],
  verify: verifyBinary("gh-dash_{version}_linux-amd64", ["--version"]),
});
