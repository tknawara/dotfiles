return {
  -- Make all standard UI elements transparent to match the Catppuccin
  -- transparent_background setting.
  {
    "xiyaowong/transparent.nvim",
    lazy = false,
    priority = 1001,
    config = function()
      require("transparent").setup({
        groups = { -- table: default groups
          "Normal",
          "NormalNC",
          "Comment",
          "Constant",
          "Special",
          "Identifier",
          "Statement",
          "PreProc",
          "Type",
          "Underlined",
          "Todo",
          "String",
          "Function",
          "Conditional",
          "Repeat",
          "Operator",
          "Structure",
          "LineNr",
          "NonText",
          "SignColumn",
          "CursorLine",
          "CursorLineNr",
          "StatusLine",
          "StatusLineNC",
          "EndOfBuffer",
        },
        extra_groups = { -- extra groups to clear
          "NormalFloat",
          "NvimTreeNormal",
          "NeoTreeNormal",
          "NeoTreeNormalNC",
          "NeoTreeEndOfBuffer",
          "FloatBorder",
          "TelescopeNormal",
          "TelescopeBorder",
          "WhichKeyFloat",
          "LazyNormal",
          "MasonNormal",
          "NoiceCmdlinePopup",
          "NoiceCmdlinePopupBorder",
          "NotifyBackground",
        },
        exclude_groups = {}, -- groups you don't want to clear
      })

      -- Force clear Normal immediately after setup in case something resets it
      vim.api.nvim_set_hl(0, "Normal", { bg = "NONE", ctermbg = "NONE" })
      vim.api.nvim_set_hl(0, "NormalNC", { bg = "NONE", ctermbg = "NONE" })
      vim.api.nvim_set_hl(0, "NormalFloat", { bg = "NONE", ctermbg = "NONE" })
    end,
  },
}
