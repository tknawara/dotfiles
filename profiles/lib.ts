/** Small authoring helpers: one place for the target, and the three file
 *  shapes this repo uses. Everything stays plain gripsack values. */
import {
  artifactFile, file, githubRelease, identity, pkg, provider, repoFile, repoTree,
  symlinkTo, targetPlatform, trackedCopyTo,
} from "@gripsack/core";
import type { WorkspaceFile, WorkspaceOutput } from "@gripsack/core";

export const target = targetPlatform({ os: "linux", arch: "x86_64" });
/** glibc-linked release binaries must say so to borrow host libraries */
export const gnuTarget = targetPlatform({ os: "linux", arch: "x86_64", abi: "gnu" });

/** A package plus the launchers and files that come with it. */
export interface Tool {
  name: string;
  /** conda prefix: binaries need their siblings ($ORIGIN rpaths, runtime
   *  dirs), so they are linked to the realized prefix by a hook instead */
  viaHook?: boolean;
  pkg: WorkspaceOutput;
  /** command name → payload path, linked straight into ~/.local/bin */
  commands: Record<string, string>;
  files: WorkspaceFile[];
}

/** Each command as a direct store symlink. Managed launchers re-admit the
 *  whole environment on every exec (~0.3–2s), far too slow for ls/cat/rg. */
export const binLinks = (t: Tool): WorkspaceFile[] =>
  t.viaHook ? [] : Object.entries(t.commands).map(([cmd, path]) =>
    file({ source: artifactFile(t.name, path), content: identity(), destination: symlinkTo(`~/.local/bin/${cmd}`) }));

/** read-only, store-backed symlink of one repo file */
export const link = (src: string, dest: string): WorkspaceFile =>
  file({ source: repoFile(src), content: identity(), destination: symlinkTo(dest) });

/** read-only, store-backed symlinks of a repo directory */
export const linkTree = (src: string, dest: string): WorkspaceFile =>
  file({ source: repoTree(src), content: identity(), destination: symlinkTo(dest) });

/** a copy the app may rewrite; gripsack reports drift instead of clobbering */
export const copy = (src: string, dest: string): WorkspaceFile =>
  file({ source: repoFile(src), content: identity(), destination: trackedCopyTo(dest) });

/** A GitHub-release tool. `wrapped` strips the archive's single top dir. */
export function release(name: string, spec: {
  repo: string;
  asset: string;
  commands: Record<string, string>;
  wrapped?: boolean;
  /** glibc-linked binary: libc & friends come from the host, explicitly */
  glibc?: boolean;
  files?: WorkspaceFile[];
}): Tool {
  return {
    name,
    pkg: pkg(name, {
      producer: provider(githubRelease({ repo: spec.repo, asset: spec.asset })),
      commands: spec.commands,
      target: spec.glibc ? gnuTarget : target,
      layout: { kind: "relocatable" },
      ...(spec.wrapped ? { archiveRoot: { kind: "single_directory" as const } } : {}),
      ...(spec.glibc ? { hostRuntime: { libraryDirectories: ["/usr/lib/x86_64-linux-gnu"] } } : {}),
    }),
    commands: spec.commands,
    files: spec.files ?? [],
  };
}
