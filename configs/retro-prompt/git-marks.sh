#!/usr/bin/env bash
# Prints git status marks (=*+?-⇡N⇣N) in Catppuccin yellow. Run async by flyline.
out=$(git --no-optional-locks status --porcelain=v2 --branch 2>/dev/null) || exit 0
c= m= s= u= d= a=0 b=0
while IFS= read -r l; do
  case $l in
    "# branch.ab "*) read -r _ _ a b <<<"$l"; a=${a#+}; b=${b#-} ;;
    "? "*) u='?' ;;
    "u "*) c='=' ;;
    "1 "*|"2 "*) [[ ${l:2:1} != . ]] && s='+'
                 [[ ${l:3:1} == M ]] && m='*'
                 [[ ${l:3:1} == D ]] && d='-' ;;
  esac
done <<<"$out"
r="$c$m$s$u$d"; (( a )) && r+="⇡$a"; (( b )) && r+="⇣$b"
[[ -n $r ]] && printf '\e[38;2;249;226;175m%s\e[0m' "$r"
exit 0
