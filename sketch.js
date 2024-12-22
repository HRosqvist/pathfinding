let columns = 80
let rows = 80
let grid = new Array(columns)

let openSet = []
let closedSet = []

let start
let end

let resolutionWidth
let resolutionHeight

let path = []

function setup() {
  createCanvas(800, 800);

  resolutionWidth = width / columns
  resolutionHeight = height / rows

  for (let i = 0; i < columns; i++) {
    grid[i] = new Array(rows)
  }
  
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Tile(i, j, resolutionWidth, resolutionHeight)
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid)
    }
  }

  start = grid[0][0]
  end = grid[columns - 1][rows - 1]

  start.wall = false
  end.wall = false

  openSet.push(start)
}

function draw() {
  let current
  if (openSet.length > 0) {
    let lowestIndex = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i
      }
    }

    current = openSet[lowestIndex]

    if (current === end) {
      console.log('Done')
      noLoop()
    }
    
    removeFromArray(openSet, current)
    closedSet.push(current)

    let neighbors = current.neighbors

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i]

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tentativeG = current.g + 1
        let newPath = false
        if (openSet.includes(neighbor)) {
          if (tentativeG < neighbor.g) {
            neighbor.g = tentativeG
            newPath = true
          }
        } else {
          neighbor.g = tentativeG
          newPath = true
          openSet.push(neighbor)
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end)
          neighbor.f = neighbor.g + neighbor.h
          neighbor.parent = current
        }
        
      }

      
    }
    
  } else {
    console.log('No solution')
    noLoop()
    return
  }

  background(0);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(220)
    }
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0))
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0))
  }

  path = []
  let temp = current
  path.push(temp)

  while(temp.parent) {
    path.push(temp.parent)
    temp = temp.parent
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255))
  }

}

function mousePressed() {
  grid[floor(mouseX / resolutionWidth)][floor(mouseY / resolutionHeight)].wall = true
}

function removeFromArray(array, element) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] == element) {
      array.splice(i, 1)
    }
  }
}

function heuristic(pointA, pointB) {
  let distance = dist(pointA.x, pointA.y, pointB.x, pointB.y)
  return distance
}