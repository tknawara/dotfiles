/** The no-config CLI tools — each a pure value, exported as one array
 *  (a module file can hold several). Unpinned versions float: the
 *  lockfile pins them on first apply, `grip update <name>` moves them
 *  deliberately. */
import { githubRelease, module, pixi, symlink, verifyBinary } from "@gripsack/core";

// nested payload dirs are named once, referenced everywhere — the
// const pattern for multi-key payloads
const RG = "ripgrep-{version}-{target}";
const FD = "fd-v{version}-{target}";
const FF = "fastfetch-{os}-{arch.go}";

export default [
  module("ripgrep", {
    fetch: githubRelease({
      repo: "BurntSushi/ripgrep",
      asset: `${RG}.tar.gz`,
    }),
    install: { [`${RG}/rg`]: symlink("~/.local/bin/rg") },
    verify: verifyBinary(`${RG}/rg`, ["--version"]),
  }),

  module("fd", {
    fetch: githubRelease({
      repo: "sharkdp/fd",
      asset: "fd-{version}-{target}.tar.gz",
    }),
    install: { [`${FD}/fd`]: symlink("~/.local/bin/fd") },
    verify: verifyBinary(`${FD}/fd`, ["--version"]),
  }),

  module("eza", {
    fetch: githubRelease({
      repo: "eza-community/eza",
      asset: "eza_{arch}-unknown-linux-gnu.tar.gz",
    }),
    install: { eza: symlink("~/.local/bin/eza") },
    verify: verifyBinary("eza", ["--version"]),
  }),

  module("fastfetch", {
    fetch: githubRelease({
      repo: "fastfetch-cli/fastfetch",
      asset: `${FF}.tar.gz`,
    }),
    install: { [`${FF}/usr/bin/fastfetch`]: symlink("~/.local/bin/fastfetch") },
    verify: verifyBinary(`${FF}/usr/bin/fastfetch`, ["--version"]),
  }),

  module("htop", {
    fetch: pixi("htop"),
    install: { "bin/htop": symlink("~/.local/bin/htop") },
    verify: verifyBinary("bin/htop", ["--version"]),
  }),

  module("gh", {
    fetch: pixi("gh"),
    install: { "bin/gh": symlink("~/.local/bin/gh") },
    verify: verifyBinary("bin/gh", ["auth", "--help"]),
  }),
];
