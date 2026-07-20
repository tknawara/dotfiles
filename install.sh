#!/usr/bin/env bash
set -euo pipefail

DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$HOME/.dotfiles_backup/$(date +%Y%m%d_%H%M%S)"

echo "Installing dotfiles from $DOTFILES_DIR"
echo "Backups will go to $BACKUP_DIR"

backup_if_exists() {
  local target="$1"
  if [[ -e "$target" || -L "$target" ]]; then
    mkdir -p "$BACKUP_DIR"
    mv "$target" "$BACKUP_DIR/"
  fi
}

link_dir() {
  local src="$1"
  local dst="$2"
  backup_if_exists "$dst"
  mkdir -p "$(dirname "$dst")"
  ln -sfn "$src" "$dst"
  echo "Linked $dst -> $src"
}

# nvim
link_dir "$DOTFILES_DIR/nvim" "$HOME/.config/nvim"

# tmux: backup and replace any existing file/dir, then restore TPM on first install
TMUX_TARGET="$HOME/.config/tmux"
TPM_BACKUP=""
if [[ -d "$TMUX_TARGET/plugins/tpm" ]]; then
  TPM_BACKUP="$BACKUP_DIR/tpm_backup"
  mkdir -p "$TPM_BACKUP"
  mv "$TMUX_TARGET/plugins/tpm" "$TPM_BACKUP/"
fi
link_dir "$DOTFILES_DIR/tmux" "$HOME/.config/tmux"
if [[ -n "$TPM_BACKUP" && -d "$TPM_BACKUP/tpm" ]]; then
  mkdir -p "$HOME/.config/tmux/plugins"
  mv "$TPM_BACKUP/tpm" "$HOME/.config/tmux/plugins/"
fi

# Install Tmux Plugin Manager (TPM) if missing
TPM_DIR="$HOME/.config/tmux/plugins/tpm"
if [[ ! -d "$TPM_DIR" ]]; then
  echo "Installing Tmux Plugin Manager (TPM)..."
  git clone https://github.com/tmux-plugins/tpm.git "$TPM_DIR"
else
  echo "TPM already installed at $TPM_DIR"
fi

# Install tmux plugins headlessly (safe to run even if already installed)
if command -v tmux &>/dev/null; then
  echo "Installing tmux plugins..."
  "$TPM_DIR/bin/install_plugins" || true
fi

# helix
link_dir "$DOTFILES_DIR/helix" "$HOME/.config/helix"

# yazi: terminal file manager (Catppuccin Mocha)
link_dir "$DOTFILES_DIR/yazi" "$HOME/.config/yazi"

# Install yazi + ya binaries from GitHub releases if missing
if [[ ! -x "$HOME/.local/bin/yazi" ]]; then
  echo "Installing yazi..."
  YAZI_ARCH=""
  case "$(uname -m)" in
    x86_64)  YAZI_ARCH="x86_64-unknown-linux-gnu" ;;
    aarch64) YAZI_ARCH="aarch64-unknown-linux-gnu" ;;
    *) echo "Unsupported arch for yazi: $(uname -m)" >&2 ;;
  esac
  if [[ -n "$YAZI_ARCH" ]]; then
    YAZI_URL="https://github.com/sxyazi/yazi/releases/latest/download/yazi-${YAZI_ARCH}.zip"
    YAZI_TMP="$(mktemp -d)"
    (cd "$YAZI_TMP" && curl -fsSL "$YAZI_URL" -o yazi.zip && unzip -o yazi.zip >/dev/null)
    install -m 0755 "$YAZI_TMP/yazi-${YAZI_ARCH}/yazi" "$HOME/.local/bin/yazi"
    install -m 0755 "$YAZI_TMP/yazi-${YAZI_ARCH}/ya"   "$HOME/.local/bin/ya"
    rm -rf "$YAZI_TMP"
    echo "yazi installed at $HOME/.local/bin/yazi"
    "$HOME/.local/bin/yazi" --version
  fi
else
  echo "yazi already installed at $HOME/.local/bin/yazi"
fi

# herdr (tmux agent-aware multiplexer)
if [[ ! -f "$HOME/.local/bin/herdr" ]]; then
  echo "Installing herdr..."
  "$DOTFILES_DIR/herdr/install.sh"
else
  echo "herdr already installed at $HOME/.local/bin/herdr"
fi

# Ensure local bin is on PATH (AppImage nvim lives here)
mkdir -p "$HOME/.local/bin"
if ! grep -q "$HOME/.local/bin" "$HOME/.bashrc" 2>/dev/null; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
  echo "Added $HOME/.local/bin to PATH in ~/.bashrc"
fi

echo ""
echo "Dotfiles installed. Open a new shell or run:"
echo "  source ~/.bashrc"
echo ""
echo "Then run:"
echo "  nvim     # LazyVim will bootstrap"
echo "  tmux     # tmux with Catppuccin Mocha status bar"
echo "  hx       # Helix with Catppuccin Mocha"
echo "  yazi     # file manager with Catppuccin Mocha"
