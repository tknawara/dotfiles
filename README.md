# dotfiles — powered by [gripsack](https://gripsack.dev)

My whole terminal environment in one repo: every tool from a pinned public
source, every config file, deployed into gripsack's hash-addressed store with
generations and instant rollback.

```bash
curl -fsSL https://gripsack.dev/install.sh | sh   # grip ≥ 0.58
grip trust inspect          # review, then approve with the printed digests
grip check                  # validate everything, zero side effects
grip plan                   # what would change, before anything moves
grip apply                  # the whole environment, one atomic generation
```

## What's managed

| | |
|---|---|
| shell | bash + [flyline](https://github.com/HalFrgrd/flyline) (readline replacement, Catppuccin Mocha palette), a pure-bash retro prompt with async git status, atuin history (Ctrl+R / Up), zoxide `cd`; fish + starship kept as a fallback |
| rust coreutils | eza (`ls`), bat (`cat`, `man`), dust (`du`), procs (`ps`), bottom (`top`), xh (`http`), ripgrep, fd, sd, delta, hyperfine |
| editors | helix (default `$EDITOR`), strop, neovim (LazyVim) |
| git & review | lazygit, gitui, tuicr, hunk, gh-dash, worktrunk, gh |
| everything else | yazi, tmux + TPM, htop, fastfetch, herdr |
| python | conda-forge Python 3.13 with numpy, pandas, polars, scipy, httpx, rich, … shadowing Ubuntu's `python3` |
| claude code | statusline (same retro style), settings (tracked copy) |
| windows (WSL) | the matching oh-my-posh theme for PowerShell |

## Layout

- `gripsack.ts` — the workspace: packages + one `personal` profile
- `profiles/lib.ts` — tiny helpers (`release`, `link`, `linkTree`, `copy`, `binLinks`)
- `profiles/tools.ts` — GitHub-release tools, one line-group each
- `profiles/conda.ts` — conda-forge environments (CLI tools, Python)
- `profiles/shell.ts` — flyline, the bashrc/profile managed blocks, TPM
- `configs/` — config payloads, deployed by reference
- `gripsack.lock` — every pin; commit it. `grip update` moves them.

## Notes

- Release binaries are linked straight into `~/.local/bin` (no launcher hop);
  conda commands get 2-line exec wrappers into their realized prefix from a
  `post_link` hook so `$ORIGIN` rpaths keep working.
- The modern C/C++ toolchain (`cpp` in `profiles/conda.ts`) is defined but not
  deployed yet — blocked on a gripsack closure-check limitation.
