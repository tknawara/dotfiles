# Retro prompt for bash + flyline — Catppuccin Mocha, green variant.
#   ╭─  TAREK :: ~/workspace/gripsack/crates :: main*+ :: 4.2s          14:32
#   ╰─▶
source ~/.config/retro-prompt/lib.bash

# Git dirty marks run in the background so `git status` never blocks the prompt.
if [[ $(type -t flyline) == builtin ]]; then
  flyline create-prompt-widget custom --name RPGITMARKS \
    --command "$HOME/.config/retro-prompt/git-marks.sh" --placeholder prev
  __RP_MARKS=RPGITMARKS
fi

# Command timer: PS0 stamps the start time without forking. The expansion is a
# zero-length substring of an empty var, so it records the time but prints nothing.
__RP_NUL=
PS0='${__RP_NUL:0:$((__RP_T0=${EPOCHREALTIME/./}/1000, 0))}'

__rp_prompt() {
  local st=$? sep="\[${__RP_OV}\] :: \[${__RP_R}\]" dur=
  __rp_git
  __rp_path "$PWD" '\[' '\]'
  local p="\[${__RP_OV}\]╭─ \[${__RP_OSC}\]${__RP_OS} \[${__RP_GRN}${__RP_B}\]TAREK\[${__RP_R}\]${sep}${REPLY}"
  if [[ -n $__RP_BRANCH ]]; then
    p+="${sep}\[${__RP_YEL}\]${__RP_BRANCH}\[${__RP_R}\]${__RP_MARKS}"
  fi
  if [[ -n $__RP_T0 ]]; then
    local ms=$(( ${EPOCHREALTIME/./}/1000 - __RP_T0 ))
    if (( ms >= 2000 )); then
      if (( ms < 60000 )); then dur="$((ms/1000)).$((ms%1000/100))s"
      else dur="$((ms/60000))m$((ms%60000/1000))s"; fi
      p+="${sep}\[${__RP_SUB}\]${dur}\[${__RP_R}\]"
    fi
    __RP_T0=
  fi
  local arrow=$__RP_GRN; (( st )) && arrow=$__RP_RED
  PS1="${p}\n\[${__RP_OV}\]╰─\[${arrow}${__RP_B}\]▶\[${__RP_R}\] "
}
RPS1="\[${__RP_OV}\]\A\[${__RP_R}\]"
PROMPT_COMMAND="__rp_prompt${PROMPT_COMMAND:+;$PROMPT_COMMAND}"
