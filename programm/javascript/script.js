//Main programming file of the game:

//imports
import {collisions} from "../data/collisions 1.js"
import {collisionsB1} from "../data/battlezones/map 1/battlezone 1.js"
import {Boundary} from "../javascript/classes.js"
import {Sprite} from "../javascript/classes.js"

//create const c
const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

//create const collisionsMap
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

//create const battlezones1Map
const battlezones1Map = []
for (let i = 0; i < collisionsB1.length; i += 70) {
  battlezones1Map.push(collisionsB1.slice(i, 70 + i))
}

//create const boundaries
const boundaries = []
//create const offset
const offset = {
  x: -735,
  y: -650
}

//loading collisions
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})


//create const battle1zones
const battle1zones = []

//load battlezone
battlezones1Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battle1zones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

console.log (battle1zones)





//image sources
const image = new Image()
image.src = '../res/maps/mapzoom.png'

const playerDownImage = new Image()
playerDownImage.src = '../res/player/ACharDown.png'

const playerUpImage = new Image()
playerUpImage.src = '../res/player/ACharUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = '../res/player/ACharLeft.png'

const playerRightImage = new Image()
playerRightImage.src = '../res/player/ACharRight.png'

const foregroundImage = new Image()
foregroundImage.src = '../res/foreground objects/foreground.png'

const SlimeBlue = new Image()
SlimeBlue.src = '../res/slimes/slime-blue.png'




//create const player
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})
console.log(player)

//create const background
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})



//create const keys
const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

//create const movables (all moving elements)
const movables = [background, ...boundaries, foreground, ...battle1zones,]

//collision-detector
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

//create const battle
const battle = {
  initiated: false
}

//animate function
function animate() {
  const animationId = window.requestAnimationFrame(animate)
//draw()
  background.draw()
  boundaries.forEach((boundary) => {
    boundary.draw()
  })
  battle1zones.forEach((boundary) => {
    boundary.draw()
  })

  
  player.draw()
  foreground.draw()
  
  

  let moving = true
  player.moving = false

  
  if (battle.initiated) return

  
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
  for (let i = 0; i < battle1zones.length; i++) {

  //create const battle1zone
  const battle1zone = battle1zones[i]

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: battle1zone
    })){
      //battle activation
      console.log('activate battle')
      window.cancelAnimationFrame(animationId)
        battle.initiated = true

        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4
            })

            // activate a new animation loop
            animateBattle()
          }
        })

        break
    }}}
  //player movement by w,a,s,d
  if (keys.w.pressed && lastKey === 'w') {
    player.moving = true
    player.image = player.sprites.up

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.moving = true
    player.image = player.sprites.left

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
  } else if (keys.s.pressed && lastKey === 's') {
    player.moving = true
    player.image = player.sprites.down

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
  } else if (keys.d.pressed && lastKey === 'd') {
    player.moving = true
    player.image = player.sprites.right
    
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
  }
}
//battle-animation
animate()

function animateBattle() {
  window.requestAnimationFrame(animateBattle)
  console.log('animating battle')
}

//create let lastKey and activate keys by "keydown" event
let lastKey = ''
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

//disable keys by "keyup" event
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})
