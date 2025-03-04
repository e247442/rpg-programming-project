//Main programming file of the game:

//create const c
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

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

const battlezones2Map = []
for (let i = 0; i < collisionsB2.length; i += 70) {
  battlezones2Map.push(collisionsB2.slice(i, 70 + i))
}

const battlezones3Map = []
for (let i = 0; i < collisionsB3.length; i += 70) {
  battlezones3Map.push(collisionsB3.slice(i, 70 + i))
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


const battle2zones = []

battlezones2Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battle2zones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

console.log (battle2zones)

const battle3zones = []

battlezones3Map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battle3zones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

console.log (battle3zones)



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

const SlimeBlueImage = new Image()
SlimeBlueImage.src = '../res/slimes/slime-blue.png'

const Slime2BlueImage = new Image()
Slime2BlueImage.src = '../res/slimes/slime-blue.png'

const SlimeGreenImage = new Image()
SlimeGreenImage.src = '../res/slimes/slimes-green.png'

const Slime2GreenImage = new Image()
Slime2GreenImage.src = '../res/slimes/slimes-green.png'

const SlimePinkImage = new Image()
SlimePinkImage.src = '../res/slimes/slimes-pink.png'

const Slime2PinkImage = new Image()
Slime2PinkImage.src = '../res/slimes/slimes-pink.png'

const Slime3PinkImage = new Image()
Slime3PinkImage.src = '../res/slimes/slimes-pink.png'




//create const player
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})
console.log(player)


const SlimeBlue = new Sprite({
  position: {
    x: 129,
    y: 214,
  },
  image: SlimeBlueImage,
  frames: {
    max: 6,
    hold: 10
  },
})

const Slime2Blue = new Sprite({
  position: {
    x: 1185,
    y: 646,
  },
  image: Slime2BlueImage,
  frames: {
    max: 6,
    hold: 10
  },
})

const SlimeGreen = new Sprite({
  position: {
    x: 1665,
    y: 22,
  },
  image: SlimeGreenImage,
  frames: {
    max: 6,
    hold: 10
  },
})

const Slime2Green = new Sprite({
  position: {
    x: 705,
    y: 550,
  },
  image: Slime2GreenImage,
  frames: {
    max: 6,
    hold: 10
  },
})

const SlimePink = new Sprite({
  position: {
    x: 993,
    y: 310,
  },
  image: SlimePinkImage,
  frames: {
    max: 6,
    hold: 10
  },
})

const Slime2Pink = new Sprite({
  position: {
    x: 945,
    y: 22,
  },
  image: Slime2PinkImage,
  frames: {
    max: 6,
    hold: 10
  },
})

const Slime3Pink = new Sprite({
  position: {
    x: 753,
    y: -74,
  },
  image: Slime3PinkImage,
  frames: {
    max: 6,
    hold: 10
  },
})

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
const movables = [background, ...boundaries, foreground, ...battle1zones, ...battle2zones, ...battle3zones, SlimeBlue, Slime2Blue, SlimeGreen
, Slime2Green, SlimePink, Slime2Pink, Slime3Pink ]

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
  SlimeBlue.draw()
  Slime2Blue.draw()
  SlimeGreen.draw()
  Slime2Green.draw()
  SlimePink.draw()
  Slime2Pink.draw()
  Slime3Pink.draw()
  boundaries.forEach((boundary) => {
    boundary.draw()
  })
  battle1zones.forEach((boundary) => {
    boundary.draw()
  })
  battle2zones.forEach((boundary) => {
    boundary.draw()
  })
  battle3zones.forEach((boundary) => {
    boundary.draw()
  })

  
  player.draw()
  foreground.draw()
  
  

  let moving = true
  player.animate = false
  SlimeBlue.animate = true
  Slime2Blue.animate = true
  SlimeGreen.animate = true
  Slime2Green.animate = true
  SlimePink.animate = true
  Slime2Pink.animate = true
  Slime3Pink.animate = true

  

  
  if (battle.initiated) return

  
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
  for (let i = 0; i < battle1zones.length; i++) {

  //create const battle1zone
  const battle1zone = battle1zones[i]

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: battle1zone
    })) {
      //battle activation
      console.log('activate battle')
      window.cancelAnimationFrame(animationId)

      audio.Map.stop()
      audio.initBattle.play()
      audio.battle.play()

      
      
        battle.initiated = true

        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })
          }
        })

        break
    }}}

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
      for (let i = 0; i < battle2zones.length; i++) {
    
      //create const battle1zone
      const battle2zone = battle2zones[i]
    
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battle2zone
        })){
          //battle activation
          console.log('activate battle')
          window.cancelAnimationFrame(animationId)

          audio.Map.stop()
          audio.initBattle.play()
          audio.battle.play()
          
            battle.initiated = true
            
    
            gsap.to('#overlappingDiv', {
              opacity: 1,
              repeat: 3,
              yoyo: true,
              duration: 0.4,
              onComplete() {
                gsap.to('#overlappingDiv', {
                  opacity: 1,
                  duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })  
            }
          })
    
            break
        }}}

        if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
          for (let i = 0; i < battle3zones.length; i++) {
        
          //create const battle1zone
          const battle3zone = battle3zones[i]
        
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: battle3zone
            })){
              //battle activation
              console.log('activate battle')
              window.cancelAnimationFrame(animationId)

              audio.Map.stop()
              audio.initBattle.play()
              audio.battle.play()
              
                battle.initiated = true
                
        
                gsap.to('#overlappingDiv', {
                  opacity: 1,
                  repeat: 3,
                  yoyo: true,
                  duration: 0.4,
                  onComplete() {
                    gsap.to('#overlappingDiv', {
                      opacity: 1,
                      duration: 0.4,
                      onComplete() {
                        // activate a new animation loop
                        initBattle()
                        animateBattle()
                        gsap.to('#overlappingDiv', {
                          opacity: 0,
                          duration: 0.4
                        })
                      }
                    })
                  }
                })
        
                break
            }}}


  //player movement by w,a,s,d
  if (keys.w.pressed && lastKey === 'w') {
    player.animate = true
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
    player.animate = true
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
    player.animate = true
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
    player.animate = true
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

let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})
