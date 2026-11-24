#!/usr/bin/env bash
# Retro statusline (Catppuccin Mocha, green):  OPUS 5.5 :: ~/workspace/gripsack :: main* :: ctx 48% :: 14:32
in=$(cat)
source ~/.config/retro-prompt/lib.bash
SEP=" ${__RP_OV}::${__RP_R} "
model=$(jq -r '.model.display_name // "claude"' <<<"$in"); model=${model^^}
dir=$(jq -r '.workspace.current_dir // .cwd // empty' <<<"$in"); dir=${dir:-$PWD}
pct=$(jq -r '.context_window.used_percentage // empty' <<<"$in")

__rp_git "$dir"; __rp_path "$dir"
out="${__RP_GRN}${__RP_B}${model}${__RP_R}${SEP}${REPLY}"
if [[ -n $__RP_BRANCH ]]; then
  out+="${SEP}${__RP_YEL}${__RP_BRANCH}${__RP_R}$(cd "$dir" && ~/.config/retro-prompt/git-marks.sh)"
fi
if [[ -n $pct ]]; then
  p=${pct%.*}; col=$__RP_GRN; (( p >= 50 )) && col=$__RP_YEL; (( p >= 80 )) && col=$__RP_RED
  out+="${SEP}${col}ctx ${p}%${__RP_R}"
fi
out+="${SEP}${__RP_OV}$(printf '%(%H:%M)T')${__RP_R}"
printf '%s' "$out"
