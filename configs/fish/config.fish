# Fish shell config (managed by gripsack — edit here, `grip apply`)

if status is-interactive
    # Vi key bindings: Esc drops to normal mode for vim-style motions/operators
    # (hjkl, w/b/e, d/c/y + motion, etc). starship.toml's [character] block
    # already themes the vimcmd_* mode indicators, so this is the only piece
    # needed to light them up.
    fish_vi_key_bindings

    # Starship prompt (Catppuccin Mocha powerline theme, ~/.config/starship/starship.toml).
    # starship has no native XDG subfolder convention, so STARSHIP_CONFIG is
    # required to point it at its own folder like every other tool here.
    set -gx STARSHIP_CONFIG $HOME/.config/starship/starship.toml
    starship init fish | source

    # worktrunk (wt): shell integration so `wt switch <branch>` cd's the shell.
    # Guard with `type -q` so it's a no-op if wt isn't installed.
    type -q wt; and wt config shell init fish | source

    # atuin: shell history manager (guard on availability).
    type -q atuin; and atuin init fish | source

    # bat and eza aliases (guard on availability).
    type -q bat; and alias cat bat
    type -q eza; and alias ls "eza -lah"
end

# Announce truecolor support explicitly - neither Windows Terminal nor the
# xterm-256color terminfo entry advertise this, so apps that read COLORTERM
# directly (e.g. Helix) fall back to 256 colors otherwise. Mirrors ~/.bashrc.
set -gx COLORTERM truecolor

# fish does NOT source .bashrc/.profile, so mirror the PATH dirs bash uses.
# fish_add_path is idempotent (prepends only if missing).
fish_add_path -g $HOME/.local/bin $HOME/bin $HOME/.pixi/bin

# pixi bundles its own TLS roots (rustls) and ignores the system cert store, so
# it needs SSL_CERT_FILE pointed at the system CA bundle wherever a TLS-
# intercepting proxy sits in the path. Path differs by distro; use the first
# that exists.
for ca in /etc/pki/tls/certs/ca-bundle.crt /etc/ssl/certs/ca-certificates.crt
    if test -f $ca
        set -gx SSL_CERT_FILE $ca
        break
    end
end

# yazi: `y` wrapper that changes the shell's directory to yazi's last location
# on quit (the canonical yazi shell integration - plain `yazi` works too, but
# won't cd the parent shell). https://yazi-rs.github.io/docs/quick-start
function y
    set tmp (mktemp -t "yazi-cwd.XXXXXX")
    yazi $argv --cwd-file="$tmp"
    if read -z cwd <"$tmp"; and [ -n "$cwd" ]; and [ "$cwd" != "$PWD" ]
        builtin cd -- "$cwd"
    end
    rm -f -- "$tmp"
end
