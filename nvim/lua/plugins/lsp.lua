return {
  -- LSP extras and custom LSP settings go here.
  -- LazyVim automatically installs and configures LSP servers via Mason + nvim-lspconfig.
  -- Enable language extras in lua/config/lazy.lua (e.g. lazyvim.plugins.extras.lang.typescript)
  -- or add servers manually below.
  {
    "neovim/nvim-lspconfig",
    opts = {
      -- example: customize diagnostics or servers
      diagnostics = {
        underline = true,
        update_in_insert = false,
        virtual_text = {
          spacing = 4,
          source = "if_many",
          prefix = "●",
        },
        severity_sort = true,
      },
      -- servers = {
      --   lua_ls = {},
      --   pyright = {},
      --   tsserver = {},
      -- },
    },
  },
}
