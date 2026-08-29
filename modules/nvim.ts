/** neovim — LazyVim setup. The config tree is owned EXCEPT
 *  lazy-lock.json, which lazy.nvim rewrites at runtime: that one file
 *  is tracked_copy (your plugin state is detected, never clobbered)
 *  and lives in its own payload so the tree keeps the rest read-only. */
import { githubRelease, module, symlink, trackedCopy, tree, verifyBinary } from "@gripsack/core";

export default module("nvim", {
  fetch: githubRelease({
    repo: "neovim/neovim",
    asset: "nvim-{os}-{arch}.tar.gz",
  }),
  install: { "nvim-{os}-{arch}/bin/nvim": symlink("~/.local/bin/nvim") },
  config: {
    ...tree("configs/nvim", "~/.config/nvim", "owned"),
    "configs/nvim-lock/lazy-lock.json": trackedCopy("~/.config/nvim/lazy-lock.json"),
  },
  verify: verifyBinary("nvim-{os}-{arch}/bin/nvim", ["--version"]),
});
