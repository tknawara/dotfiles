# Retro prompt helpers — pure bash, no forks. Shared by the bash prompt and Claude statusline.
__RP_MAXLEN=${__RP_MAXLEN:-48}
__RP_R=$'\e[0m' __RP_B=$'\e[1m'
__RP_GRN=$'\e[38;2;166;227;161m' __RP_TEAL=$'\e[38;2;148;226;213m' __RP_YEL=$'\e[38;2;249;226;175m'
__RP_RED=$'\e[38;2;243;139;168m' __RP_SUB=$'\e[38;2;166;173;200m' __RP_OV=$'\e[38;2;108;112;134m'
__RP_PEACH=$'\e[38;2;250;179;135m' __RP_BLUE=$'\e[38;2;137;180;250m'

# Distro logo (Nerd Font glyph), read once from /etc/os-release without forking.
__RP_OS=$'\uf31a' __RP_OSC=$__RP_SUB
while IFS== read -r __k __v; do
  [[ $__k == ID ]] || continue
  case ${__v//\"/} in
    ubuntu) __RP_OS=$'\uf31b' __RP_OSC=$__RP_PEACH ;;
    debian) __RP_OS=$'\uf306' __RP_OSC=$__RP_RED ;;
    arch)   __RP_OS=$'\uf303' __RP_OSC=$__RP_BLUE ;;
    fedora) __RP_OS=$'\uf30a' __RP_OSC=$__RP_BLUE ;;
  esac
done 2>/dev/null < /etc/os-release
unset __k __v

__rp_tilde() { # $1 path -> REPLY with $HOME as ~
  REPLY=$1
  if [[ $REPLY == "$HOME" ]]; then REPLY='~'
  elif [[ $REPLY == "$HOME"/* ]]; then REPLY="~${REPLY#"$HOME"}"; fi
}

__rp_abbrev() { # $1 path -> REPLY with every segment cut to 1 char (2 for dotdirs)
  local IFS=/ s out=; local -a parts
  read -ra parts <<<"$1"
  for s in "${parts[@]}"; do
    [[ $s == .* ]] && s=${s:0:2} || s=${s:0:1}
    out+=$s/
  done
  REPLY=${out%/}
}

__rp_git() { # sets __RP_ROOT, __RP_BRANCH for $1 (default $PWD)
  local d=${1:-$PWD} g h
  __RP_ROOT= __RP_BRANCH=
  while :; do
    if [[ -e $d/.git ]]; then
      __RP_ROOT=${d:-/}; g=$d/.git
      if [[ -f $g ]]; then read -r h <"$g"; g=${h#gitdir: }; [[ $g == /* ]] || g=$d/$g; fi
      if read -r h <"$g/HEAD" 2>/dev/null; then
        [[ $h == ref:* ]] && __RP_BRANCH=${h#ref: refs/heads/} || __RP_BRANCH=${h:0:7}
      fi
      return
    fi
    [[ -z $d ]] && return
    d=${d%/*}
  done
}

__rp_path() { # $1 dir, $2/$3 non-printing wrappers (\[ \] for PS1) -> REPLY coloured path
  local dir=${1:-$PWD} o=$2 c=$3 pre name sub
  if [[ -n $__RP_ROOT ]]; then
    __rp_tilde "$__RP_ROOT"
    if [[ $REPLY == */* ]]; then pre=${REPLY%/*}/ name=${REPLY##*/}; else pre= name=$REPLY; fi
    sub=${dir#"$__RP_ROOT"}
  else
    __rp_tilde "$dir"
    if [[ $REPLY == */?* ]]; then pre=${REPLY%/*}/ name=${REPLY##*/}; else pre= name=$REPLY; fi
    sub=
  fi
  if (( ${#pre} + ${#name} + ${#sub} > __RP_MAXLEN )) && [[ -n $pre ]]; then
    __rp_abbrev "${pre%/}"; pre=$REPLY/
  fi
  if (( ${#pre} + ${#name} + ${#sub} > __RP_MAXLEN )) && [[ $sub == /*/* ]]; then
    local last=${sub##*/}; __rp_abbrev "${sub%/*}"; sub=$REPLY/$last
  fi
  REPLY="$o${__RP_SUB}$c${pre}$o${__RP_R}${__RP_TEAL}${__RP_B}$c${name}$o${__RP_R}${__RP_TEAL}$c${sub}$o${__RP_R}$c"
}
