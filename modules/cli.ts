/** The no-config CLI tools — each a pure value, exported as one array
 *  (a module file can hold several). Unpinned versions float: the
 *  lockfile pins them on first apply, `grip update <name>` moves them
 *  deliberately. */
import { githubRelease, module, pixi, symlink, verifyBinary } from "@gripsack/core";

export default [
  module("ripgrep", {
    fetch: githubRelease({
      repo: "BurntSushi/ripgrep",
      asset: "ripgrep-{version}-{target}.tar.gz",
    }),
    install: { "ripgrep-{version}-{target}/rg": symlink("~/.local/bin/rg") },
    verify: verifyBinary("ripgrep-{version}-{target}/rg", ["--version"]),
  }),

  module("fd", {
    fetch: githubRelease({
      repo: "sharkdp/fd",
      asset: "fd-{version}-{target}.tar.gz",
    }),
    install: { "fd-{version}-{target}/fd": symlink("~/.local/bin/fd") },
    verify: verifyBinary("fd-{version}-{target}/fd", ["--version"]),
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
      asset: "fastfetch-{os}-{arch.go}.tar.gz",
    }),
    install: { "fastfetch-{os}-{arch.go}/usr/bin/fastfetch": symlink("~/.local/bin/fastfetch") },
    verify: verifyBinary("fastfetch-{os}-{arch.go}/usr/bin/fastfetch", ["--version"]),
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
