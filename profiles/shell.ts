/** bash as the interactive shell: flyline replaces readline, the retro
 *  prompt is pure bash (git status runs async in a flyline widget). */
import {
  artifactFile, artifactTree, file, git, githubRelease, identity, managedBlock,
  pkg, provider, repoFile, symlinkTo,
} from "@gripsack/core";
import { link, linkTree, target, type Tool } from "./lib.ts";

export const flyline: Tool = {
  name: "flyline",
  pkg: pkg("flyline", {
    producer: provider(githubRelease({
      repo: "HalFrgrd/flyline",
      asset: "libflyline-{version}-x86_64-unknown-linux-gnu.tar.gz",
    })),
    commands: {},
    target,
    layout: { kind: "relocatable" },
  }),
  commands: {},
  files: [
    file({
      source: artifactFile("flyline", "libflyline.so.{version.bare}"),
      content: identity(),
      destination: symlinkTo("~/.local/lib/bash/libflyline.so"),
    }),
    linkTree("configs/retro-prompt", "~/.config/retro-prompt"),
    link("configs/shell/interactive.bash", "~/.config/shell/interactive.bash"),
    file({
      source: repoFile("configs/shell/bashrc.sh"),
      content: identity(),
      destination: managedBlock("~/.bashrc", "gripsack-shell"),
    }),
    file({
      source: repoFile("configs/shell/profile.sh"),
      content: identity(),
      destination: managedBlock("~/.profile", "gripsack-env"),
    }),
  ],
};

/** tmux plugin manager — a pinned git clone, linked whole. */
export const tpm: Tool = {
  name: "tpm",
  pkg: pkg("tpm", {
    producer: provider(git("https://github.com/tmux-plugins/tpm", "e261deb1b47614eed3400089ce7197dc68acc4eb")),
    commands: {},
    target,
    layout: { kind: "relocatable" },
  }),
  commands: {},
  files: [
    link("configs/tmux/tmux.conf", "~/.config/tmux/tmux.conf"),
    file({
      source: artifactTree("tpm", { include: ["tpm", "bin", "bindings", "scripts"] }),
      content: identity(),
      destination: symlinkTo("~/.config/tmux/plugins/tpm"),
    }),
  ],
};
