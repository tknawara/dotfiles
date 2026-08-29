# Announce truecolor support
export COLORTERM=truecolor

# Launch fish for interactive shells (no chsh, no /etc/shells, no sudo —
# reversible by removing this managed block)
if [[ $- == *i* && "$(ps -o comm= -p $PPID 2>/dev/null)" != "fish" ]] && command -v fish >/dev/null 2>&1; then
  exec fish
fi
