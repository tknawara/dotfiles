/** This machine's entrypoint — a host is a FUNCTION (plan/0013 D5):
 *  gripsack calls it with `ctx` (the machine's facts, CLI tags,
 *  declared probes) and you return the environment. Evaluation is
 *  sandboxed — no env vars, no network, no subprocesses; everything
 *  the config may know arrives via `ctx`.
 *
 *  Gating is plain code, falsy entries drop out:
 *    ctx.facts.os === "linux" && linuxOnly
 *    ctx.probe.executable("nvidia-smi") && cuda
 *
 *  `grip apply --host laptop`, or rename this file after your hostname.
 */

import { defineEnv } from "@gripsack/core";
import atuin from "../modules/atuin.ts";
import bat from "../modules/bat.ts";
import cli from "../modules/cli.ts";
import fish from "../modules/fish.ts";
import ghDash from "../modules/gh-dash.ts";
import gitui from "../modules/gitui.ts";
import helix from "../modules/helix.ts";
import hunk from "../modules/hunk.ts";
import shell from "../modules/shell.ts";
import starship from "../modules/starship.ts";
import tmux from "../modules/tmux.ts";
import tpm from "../modules/tpm.ts";
import tuicr from "../modules/tuicr.ts";
import worktrunk from "../modules/worktrunk.ts";
import yazi from "../modules/yazi.ts";

export default defineEnv(() => ({
  tags: ["personal"],
  modules: [
    shell,
    fish,
    starship,
    atuin,
    helix,
    tmux,
    tpm,
    bat,
    gitui,
    yazi,
    tuicr,
    worktrunk,
    ghDash,
    hunk,
    ...cli,
  ],
}));
