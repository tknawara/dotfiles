/** Release binaries. Versions float; grip.lock pins them, `grip update`
 *  moves them. {version} is the exact tag, {version.bare} drops one `v`. */
import { copy, link, linkTree, release, type Tool } from "./lib.ts";

const MUSL = "x86_64-unknown-linux-musl";

export const tools: Tool[] = [
  // shells & prompt
  release("fish", {
    repo: "fish-shell/fish-shell", asset: "fish-{version}-linux-x86_64.tar.xz",
    commands: { fish: "fish" },
    files: [linkTree("configs/fish", "~/.config/fish")],
  }),
  release("starship", {
    repo: "starship/starship", asset: `starship-${MUSL}.tar.gz`,
    commands: { starship: "starship" },
    files: [link("configs/starship/starship.toml", "~/.config/starship.toml")],
  }),
  release("atuin", {
    repo: "atuinsh/atuin", asset: `atuin-${MUSL}.tar.gz`, wrapped: true,
    commands: { atuin: "atuin" },
    files: [linkTree("configs/atuin", "~/.config/atuin")],
  }),

  // editors
  release("strop", {
    repo: "stropdev/strop", asset: `strop-{version.bare}-${MUSL}.tar.gz`, wrapped: true,
    commands: { strop: "strop" },
  }),
  release("nvim", {
    repo: "neovim/neovim", asset: "nvim-linux-x86_64.tar.gz", wrapped: true, glibc: true,
    commands: { nvim: "bin/nvim" },
    files: [
      linkTree("configs/nvim", "~/.config/nvim"),
      // lazy.nvim rewrites its lockfile → tracked copy
      copy("configs/nvim-lock/lazy-lock.json", "~/.config/nvim/lazy-lock.json"),
    ],
  }),

  // git & review TUIs
  release("gitui", {
    repo: "gitui-org/gitui", asset: "gitui-linux-x86_64.tar.gz",
    commands: { gitui: "gitui" },
    files: [linkTree("configs/gitui", "~/.config/gitui")],
  }),
  release("lazygit", {
    repo: "jesseduffield/lazygit", asset: "lazygit_{version.bare}_linux_x86_64.tar.gz",
    commands: { lazygit: "lazygit" },
    files: [link("configs/lazygit/config.yml", "~/.config/lazygit/config.yml")],
  }),
  release("tuicr", {
    repo: "agavra/tuicr", asset: `tuicr-{version.bare}-${MUSL}.tar.gz`,
    commands: { tuicr: "tuicr" },
    files: [link("configs/tuicr/config.toml", "~/.config/tuicr/config.toml")],
  }),
  release("hunk", {
    repo: "modem-dev/hunk", asset: "hunkdiff-linux-x64.tar.gz", wrapped: true, glibc: true,
    commands: { hunk: "hunk" },
  }),
  release("gh-dash", {
    repo: "dlvhdr/gh-dash", asset: "gh-dash_{version}_linux-amd64",
    commands: { "gh-dash": "gh-dash_{version}_linux-amd64" },
    files: [linkTree("configs/gh-dash", "~/.config/gh-dash")],
  }),
  release("worktrunk", {
    repo: "max-sixty/worktrunk", asset: `worktrunk-${MUSL}.tar.xz`, wrapped: true,
    commands: { wt: "wt", "git-wt": "git-wt" },
  }),

  // files & search
  release("yazi", {
    repo: "sxyazi/yazi", asset: `yazi-${MUSL}.zip`, wrapped: true,
    commands: { yazi: "yazi", ya: "ya" },
    files: [linkTree("configs/yazi", "~/.config/yazi")],
  }),
  release("bat", {
    repo: "sharkdp/bat", asset: `bat-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { bat: "bat" },
    files: [link("configs/bat/config", "~/.config/bat/config")],
  }),
  release("ripgrep", {
    repo: "BurntSushi/ripgrep", asset: `ripgrep-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { rg: "rg" },
  }),
  release("fd", {
    repo: "sharkdp/fd", asset: `fd-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { fd: "fd" },
  }),
  release("eza", {
    repo: "eza-community/eza", asset: `eza_${MUSL}.tar.gz`,
    commands: { eza: "eza" },
  }),
  release("fastfetch", {
    repo: "fastfetch-cli/fastfetch", asset: "fastfetch-linux-amd64.tar.gz", wrapped: true, glibc: true,
    commands: { fastfetch: "usr/bin/fastfetch" },
  }),

  // rust coreutils (aliases live in configs/shell/interactive.bash)
  release("zoxide", {
    repo: "ajeetdsouza/zoxide", asset: `zoxide-{version.bare}-${MUSL}.tar.gz`,
    commands: { zoxide: "zoxide" },
  }),
  release("dust", {
    repo: "bootandy/dust", asset: `dust-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { dust: "dust" },
  }),
  release("procs", {
    repo: "dalance/procs", asset: "procs-{version}-x86_64-linux.zip",
    commands: { procs: "procs" },
  }),
  release("bottom", {
    repo: "ClementTsang/bottom", asset: `bottom_${MUSL}.tar.gz`,
    commands: { btm: "btm" },
  }),
  release("sd", {
    repo: "chmln/sd", asset: `sd-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { sd: "sd" },
  }),
  release("delta", {
    repo: "dandavison/delta", asset: `delta-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { delta: "delta" },
  }),
  release("hyperfine", {
    repo: "sharkdp/hyperfine", asset: `hyperfine-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { hyperfine: "hyperfine" },
  }),
  release("xh", {
    repo: "ducaale/xh", asset: `xh-{version}-${MUSL}.tar.gz`, wrapped: true,
    commands: { xh: "xh" },
  }),

  // multiplexing
  release("herdr", {
    repo: "herdrdev/herdr", asset: "herdr-linux-x86_64",
    commands: { herdr: "herdr-linux-x86_64" },
  }),
];
