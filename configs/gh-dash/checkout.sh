#!/usr/bin/env bash
# Check out a PR into a throwaway git worktree under ~/.cache and drop into a
# shell there. Bound to `C` in config.yml, replacing gh-dash's `checkout`
# builtin, which runs `gh pr checkout` inside a real clone and leaves it on the
# PR's branch. Nothing here touches a working copy you care about.
#
# gh-dash runs custom keybindings through tea.ExecProcess, so this owns the
# terminal while it runs and the dashboard reappears when the shell exits.
#
# Usage: checkout.sh <owner/repo> <pr-number>
set -euo pipefail

repo=${1:?usage: checkout.sh <owner/repo> <pr-number>}
pr=${2:?usage: checkout.sh <owner/repo> <pr-number>}

cache=${XDG_CACHE_HOME:-$HOME/.cache}/gh-dash
mirror="$cache/repos/$repo.git"
worktree="$cache/worktrees/$repo/pr-$pr"
branch="pr-$pr"
headref="refs/gh-dash/pr/$pr"

if [[ ! -d $mirror ]]; then
    # --json sshUrl rather than a hardcoded host: gh resolves this against
    # whichever host it is authenticated to.
    url=$(gh repo view "$repo" --json sshUrl -q .sshUrl)
    echo "Cloning $repo -> $mirror"
    # Blobless: the tree is fetched on demand, which keeps the first checkout
    # of a large repo to seconds rather than minutes.
    mkdir -p "$(dirname "$mirror")"
    git clone --bare --filter=blob:none "$url" "$mirror"
fi

# Land the PR head on a ref outside refs/heads/ rather than straight onto
# $branch: git refuses to fetch into a branch that is checked out in a
# worktree, so fetching to refs/heads/pr-N breaks every run after the first.
git -C "$mirror" fetch --force origin "pull/$pr/head:$headref"

# Clears worktree registrations whose directory was deleted by hand; without it
# `worktree add` refuses to reuse the path.
git -C "$mirror" worktree prune

# Both branches force-sync to the PR head, discarding anything left in the
# worktree from a previous visit. This is scratch space for reading a diff, not
# somewhere to keep work.
if [[ -d $worktree ]]; then
    git -C "$worktree" checkout --force -B "$branch" "$headref"
else
    mkdir -p "$(dirname "$worktree")"
    git -C "$mirror" worktree add --force -B "$branch" "$worktree" "$headref"
fi

echo
echo "$repo#$pr checked out at:"
echo "  $worktree"
echo "Exit this shell to return to gh-dash."
echo

cd "$worktree"
exec "${SHELL:-/bin/bash}" -i
