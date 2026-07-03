#!/usr/bin/env bash
set -euo pipefail

REPO="ogulcancelik/herdr"
INSTALL_DIR="${INSTALL_DIR:-$HOME/.local/bin}"

mkdir -p "$INSTALL_DIR"

echo "Fetching latest herdr release..."
VERSION=$(curl -s "https://api.github.com/repos/$REPO/releases/latest" | grep '"tag_name"' | cut -d'"' -f4)
if [[ -z "$VERSION" ]]; then
  echo "Failed to fetch latest version" >&2
  exit 1
fi

ARCH=$(uname -m)
OS=$(uname -s | tr '[:upper:]' '[:lower:]')

ASSET=""
case "$OS-$ARCH" in
  linux-x86_64)  ASSET="herdr-linux-x86_64" ;;
  linux-aarch64) ASSET="herdr-linux-aarch64" ;;
  darwin-x86_64) ASSET="herdr-macos-x86_64" ;;
  darwin-arm64|darwin-aarch64) ASSET="herdr-macos-aarch64" ;;
  *) echo "Unsupported platform: $OS $ARCH" >&2; exit 1 ;;
esac

URL="https://github.com/$REPO/releases/download/$VERSION/$ASSET"
echo "Downloading herdr $VERSION ($ASSET)..."
curl -L -o "$INSTALL_DIR/herdr" "$URL"
chmod +x "$INSTALL_DIR/herdr"

echo "herdr installed at $INSTALL_DIR/herdr"
"$INSTALL_DIR/herdr" --version
