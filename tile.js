class Tile {
  constructor(x, y, width, height) {
    this.f = 0
    this.g = 0
    this.h = 0

    this.x = x
    this.y = y

    this.tileWidth = width
    this.tileHeight = height

    this.neighbors = []
    this.parent = undefined

    this.wall = false

    if (random(1) < 0.25) {
      this.wall = true
    }
    
  }

  addNeighbors(grid) {
    let x = this.x
    let y = this.y

    if (x < columns - 1) {
      this.neighbors.push(grid[x + 1][y])
    }

    if (x > 0) {
      this.neighbors.push(grid[x - 1][y])
    }
    
    if (y < rows - 1) {
      this.neighbors.push(grid[x][y + 1])
    }

    if (y > 0) {
      this.neighbors.push(grid[x][y - 1])
    }
    
    if (x > 0 && y > 0) {
      this.neighbors.push(grid[x - 1][y - 1])
    }

    if (x < columns - 1 && y > 0) {
      this.neighbors.push(grid[x + 1][y - 1])
    }

    if (x > 0 && y < rows - 1) {
      this.neighbors.push(grid[x - 1][y + 1])
    }

    if (x < columns - 1 && y < rows - 1) {
      this.neighbors.push(grid[x + 1][y + 1])
    }
  }

  show(color) {
    fill(color)

    if (this.wall) {
      fill(0)
    }
    stroke(0)
    rect(this.x * this.tileWidth, this.y * this.tileHeight, this.tileWidth, this.tileHeight)
  }
}