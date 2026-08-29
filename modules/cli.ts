/** The no-config CLI tools — each a pure value, exported as one array
 *  (a module file can hold several). Unpinned versions float: the
 *  lockfile pins them on first apply, `grip update <name>` moves them
 *  deliberately. */
import { githubRelease, module, pixi, symlink, verifyBinary } from "@gripsack/core";

export default [
  module("ripgrep", {
    fetch: githubRelease({
      repo: "BurntSushi/ripgrep",
      asset: "ripgrep-{version}-x86_64-unknown-linux-musl.tar.gz",
    }),
    install: { "ripgrep-{version}-x86_64-unknown-linux-musl/rg": symlink("~/.local/bin/rg") },
    verify: verifyBinary("ripgrep-{version}-x86_64-unknown-linux-musl/rg", ["--version"]),
  }),

  module("fd", {
    fetch: githubRelease({
      repo: "sharkdp/fd",
      asset: "fd-{version}-x86_64-unknown-linux-musl.tar.gz",
    }),
    install: { "fd-{version}-x86_64-unknown-linux-musl/fd": symlink("~/.local/bin/fd") },
    verify: verifyBinary("fd-{version}-x86_64-unknown-linux-musl/fd", ["--version"]),
  }),

  module("eza", {
    fetch: githubRelease({
      repo: "eza-community/eza",
      asset: "eza_x86_64-unknown-linux-gnu.tar.gz",
    }),
    install: { eza: symlink("~/.local/bin/eza") },
    verify: verifyBinary("eza", ["--version"]),
  }),

  module("fastfetch", {
    fetch: githubRelease({
      repo: "fastfetch-cli/fastfetch",
      asset: "fastfetch-linux-amd64.tar.gz",
    }),
    install: { "fastfetch-linux-amd64/usr/bin/fastfetch": symlink("~/.local/bin/fastfetch") },
    verify: verifyBinary("fastfetch-linux-amd64/usr/bin/fastfetch", ["--version"]),
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
