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
