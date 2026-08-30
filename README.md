# dotfiles — powered by [gripsack](https://gripsack.dev)

My whole terminal environment in one repo: packages from pinned public
sources plus every config file, deployed by a Rust core into a
hash-addressed store with generations and instant rollback.

```bash
# install grip
curl -fsSL https://gripsack.dev/install.sh | sh

# then
grip check              # validate everything, zero side effects
grip plan               # what would change, before anything moves
grip apply --host laptop
```

The first eval of an unfamiliar repo asks a trust question (the config
is sandboxed TypeScript — no env, no network, no subprocesses), and the
first run downloads a pinned, hash-verified Deno once. Everything else
is locked in `grip.lock`.

## What's managed

| | |
|---|---|
| shell | fish (static binary), starship prompt, atuin history, a `merge` block that makes fish the interactive shell without chsh |
| editor | helix (conda-forge via pixi) |
| multiplexer | tmux (conda-forge) + TPM (pinned git clone) |
| TUIs | gitui, yazi, gh-dash, tuicr, hunk, worktrunk, lazygit |
| editor | neovim (LazyVim) — lazy-lock.json is `tracked_copy`, the rest `owned` |
| CLI | ripgrep, fd, eza, fastfetch, htop, gh, herdr — see `modules/cli.ts` |

Asset patterns use platform placeholders (`{system}`, `{target}`,
`{arch}`, `{arch.go}`, `{os}` — gripsack 0016), so the same modules
work on linux-x86_64 and aarch64-macos. Versions float in the modules
and pin in `locks/laptop.lock`.

`herdr/` is fully replaced by `modules/herdr.ts`. Nothing left is
unmanaged — that's the point.

## Working on it (the IDE story)

`npm install` gives you full TypeScript IntelliSense on `hosts/` and
`modules/` — `@gripsack/core` ships its types, and the install doubles
as the deliberate pin (the repo's copy shadows the frontend embedded
in grip). `npx tsc` typechecks everything; `grip check` does the rest.

Module code can also use other npm packages from this repo's
`node_modules` — they're evaluated read-only under the same sandbox as
module code (no env, no network, no subprocesses, no filesystem
outside the repo). A dependency that needs an effect fails loudly at
eval; that effect belongs in a probe or a fetcher.

## Layout

- `env.toml` — the environment declaration
- `hosts/laptop.ts` — the host entrypoint: a function returning the
  environment (rename to your hostname, or keep `--host laptop`)
- `modules/` — one TypeScript file per tool; a module is a value
- `configs/` — config payloads, deployed into the store by reference
- `grip.lock` — every pin; commit it

## Living with it

```bash
grip adopt ~/.config/<tool>   # bring an existing config under management
grip update ripgrep           # move one pin deliberately
grip generations              # history
grip rollback                 # the whole setup is back. one flip.
grip store verify             # re-hash everything against the manifest
```
