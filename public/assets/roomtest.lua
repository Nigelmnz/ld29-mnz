return {
  version = "1.1",
  luaversion = "5.1",
  orientation = "orthogonal",
  width = 12,
  height = 9,
  tilewidth = 80,
  tileheight = 80,
  properties = {},
  tilesets = {
    {
      name = "base",
      firstgid = 1,
      tilewidth = 80,
      tileheight = 80,
      spacing = 0,
      margin = 0,
      image = "dark1.png",
      imagewidth = 80,
      imageheight = 80,
      properties = {},
      tiles = {}
    },
    {
      name = "dark1",
      firstgid = 2,
      tilewidth = 80,
      tileheight = 80,
      spacing = 0,
      margin = 0,
      image = "dark1.png",
      imagewidth = 80,
      imageheight = 80,
      properties = {},
      tiles = {}
    },
    {
      name = "tilesheet1",
      firstgid = 3,
      tilewidth = 80,
      tileheight = 80,
      spacing = 0,
      margin = 0,
      image = "tilesheet1.png",
      imagewidth = 400,
      imageheight = 400,
      transparentcolor = "#ff00ff",
      properties = {},
      tiles = {}
    },
    {
      name = "tilesheet1",
      firstgid = 28,
      tilewidth = 80,
      tileheight = 80,
      spacing = 0,
      margin = 0,
      image = "tilesheet1.png",
      imagewidth = 400,
      imageheight = 400,
      transparentcolor = "#ff00ff",
      properties = {},
      tiles = {}
    }
  },
  layers = {
    {
      type = "tilelayer",
      name = "Tile Layer 1",
      x = 0,
      y = 0,
      width = 12,
      height = 9,
      visible = true,
      opacity = 1,
      properties = {},
      encoding = "lua",
      data = {
        10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9,
        9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
        10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
        9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
        10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
        9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 10,
        10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
        9, 0, 5, 0, 0, 0, 9, 0, 0, 0, 0, 10,
        10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9
      }
    }
  }
}
