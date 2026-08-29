/** fish as the interactive shell, without chsh: one managed block in
 *  ~/.bashrc. Everything outside the markers is never touched; removing
 *  this module strips exactly the block. */
import { merge, module } from "@gripsack/core";

export default module("shell", {
  config: { "configs/shell/bashrc.sh": merge("~/.bashrc", "#") },
});
