# Announce truecolor support
export COLORTERM=truecolor

# Interactive bash: flyline line editor + the retro prompt (pure bash, git
# status async via a flyline widget). Falls back to starship without flyline.
if [[ $- == *i* ]]; then
  if enable flyline 2>/dev/null || enable -f ~/.local/lib/bash/libflyline.so flyline 2>/dev/null; then
    source ~/.config/retro-prompt/prompt.bash
    source ~/.config/shell/interactive.bash
  elif command -v starship >/dev/null 2>&1; then
    eval "$(starship init bash)"
  fi
fi
