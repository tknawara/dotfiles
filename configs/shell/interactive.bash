# Interactive bash: rust-first coreutils, zoxide, atuin — wired for flyline.
# Deployed by gripsack (dotfiles/configs/shell/interactive.bash).

# `init` scripts are cached and only regenerated when the binary changes,
# so a new shell never forks zoxide/atuin just to print the same script.
__cached_init() { # name, command...
  local bin cache=${XDG_CACHE_HOME:-$HOME/.cache}/shell-init/$1.bash
  bin=$(type -P "$2") || return 1
  if [[ ! -s $cache || $bin -nt $cache || ${BASH_SOURCE[0]} -nt $cache ]]; then
    mkdir -p "${cache%/*}" && "${@:2}" >"$cache" 2>/dev/null || return 1
  fi
  source "$cache"
}

# --- rust replacements (originals stay reachable as \ls, command cat, …)
if type -P eza >/dev/null; then
  alias ls='eza -lah --group-directories-first --git'
  alias ll='eza -l --git --group-directories-first --time-style=relative'
  alias la='eza -la --git --group-directories-first --time-style=relative'
  alias lt='eza --tree --level=2 --group-directories-first'
fi
if type -P bat >/dev/null; then
  alias cat='bat --paging=never --style=plain'
  export MANPAGER="sh -c 'col -bx | bat -l man -p'" MANROFFOPT=-c
fi
type -P dust  >/dev/null && alias du='dust'
type -P btm   >/dev/null && alias top='btm'
type -P procs >/dev/null && alias ps='procs'
type -P xh    >/dev/null && alias http='xh'
# grep/find keep POSIX syntax for pasted commands; reach for rg / fd directly.

# --- zoxide: `cd` learns your directories (`cdi` for the interactive picker)
__cached_init zoxide zoxide init bash --cmd cd

# --- atuin history, driven by flyline's key bindings
if __cached_init atuin atuin init bash --disable-up-arrow --disable-ctrl-r && [[ $(type -t flyline) == builtin ]]; then
  flyline key bind Ctrl+r 'always=runBashCommand(__atuin_widget_run)+submitOrNewline'
  flyline key bind Up 'editingBufferMode+cursorOnFirstLine=runBashCommand("__atuin_history --shell-up-key-binding --keymap-mode=emacs")+submitOrNewline'
fi

# --- flyline in Catppuccin Mocha (no built-in preset; slots mapped like
#     catppuccin/fish: commands blue, strings green, keywords mauve)
if [[ $(type -t flyline) == builtin ]]; then
  flyline set-style \
    normal-text="#cdd6f4" \
    recognised-command="#89b4fa" \
    unrecognised-command="bold #f38ba8" \
    bash-reserved="#cba6f7" \
    single-quoted-text="#a6e3a1" \
    double-quoted-text="#a6e3a1" \
    env-var="#f5c2e7" \
    comment="italic #7f849c" \
    inline-suggestion="italic #6c7086" \
    secondary-text="#7f849c" \
    tutorial-hint="italic #f9e2af" \
    matching-char="bold #fab387" \
    opening-and-closing-pair="#9399b2" \
    key-sequence-style="bold #fab387" \
    selected-text="#cdd6f4 on #45475a" \
    markdown-heading1="bold #cba6f7" \
    markdown-heading2="bold #89b4fa" \
    markdown-heading3="bold #94e2d5" \
    markdown-code="#a6e3a1"
  flyline set-cursor --style "#f5e0dc"
fi
