import kaboom from "kaboom"
import "kaboom/global"

// initialize context
kaboom({
  scale:1.5,
})
loadSound("score", "sounds/score.mp3");

// load assets
loadSprite("idle", 'sprites/Cat-1-Idle.png' , {
  sliceX:10, sliceY:1,
  anims: { 'idle-anim': { from: 0, to: 9, loop:true }}
})

loadSprite("walk", 'sprites/Cat-1-Walk.png', {
  sliceX:8, sliceY:1,
  anims: { 'walk-anim': { from: 0, to: 7, loop:true }
         }
})
loadSprite("run", 'sprites/Cat-1-Run.png', {
  sliceX:8, sliceY:1,
  anims: { 'run-anim': { from: 0, to: 7, loop:false }},
  
})
loadSprite("lick", "sprites/Cat-1-Licking 1.png", {
  sliceX:5, sliceY:1,
  anims: { 'lick-anim': { from: 0, to: 4, loop:true }},
  
});
loadSprite("lay", "sprites/Cat-1-Laying.png",{
  sliceX:8, sliceY:1,
  anims: { 'laying-anim': { from: 0, to: 7, speed:30 }},
});
loadSprite("sleep", "sprites/Cat-1-Sleeping2.png");
// traps 
loadSprite("spear", "sprites/Spear.png", {
  sliceX:12, sliceY:1,
  anims: { 'spear-anim': {from:0, to: 7, loop:true, speed:10 }}
})
loadSprite("spikes", "sprites/trap.png", {
  sliceX:10, sliceY:1,
  anims:{'spikes-anim': { from: 0, to:9, loop:true, speed:10 }}
})
loadSprite("PlatB", "sprites/Moving Platfrom_A.png",{
  sliceX:10, sliceY:1,
  anims:{'plat-anim':{from:0, to: 9, loop:true }}
});

// tiles
loadSpriteAtlas("sprites/tiles.png", {
  'grass' : {x: 80 , y: 32, width:18, height: 13},
  'grass2': {x:5, y: 0, width:30, height:18},
  'floatinggrass':{x:0, y:0, width:47, height:50},
  'dirt':{x:80, y:0, width:30, height:32}, 
  'deeperdirt': {x:110, y:0, width:19, height:16},
  'concrete':{x:80, y:50, width:48, height:30},
  'bricks':{x:80, y:64, width:48, height:30}
});

loadSpriteAtlas("sprites/Tileset.png", {
  'block' : {x: 20 , y: 33, width:35, height: 32}
})
loadSpriteAtlas("sprites/Decors.png", {
  'tree':{x:0, y:0, width:100, height:122},
  'stone':{x:170,y:80, width:46, height:35, },
  'bush':{x:110, y:80, width:40, height:35},
})
loadSprite("fire", "sprites/Fire.png", {
  sliceX:4, sliceY:1,
  anims: {
    wave: { 
       from: 0, to: 3, loop:true
                   
    }
  },
});
loadSprite("fallingblock", "sprites/FallingRock.png", {
  sliceX:12, sliceY:1,
    anims:{'falling-block': {from:0, to:11, loop:false}}
});
//water
loadSprite("watersprite", "sprites/waterSpriteSheet.png", {
  sliceX:4, sliceY:4,
  anims: { 'water-anim': { from:14, to:14, loop:true, }}
});
// food
loadSprite("rchicken", "sprites/rchicken.png");
loadSprite("salmon", "sprites/salmon.png");
loadSprite("cake", "sprites/90_strawberrycake.png");
loadSprite("yarn", "sprites/yarn.png");
// background
loadSprite("bg-1", "sprites/bg-1.png");
loadSprite("bg-3", "sprites/bg-3.png");
loadSprite("bg-2", "sprites/bg-2.png");
loadSprite("bg-4", "sprites/bg-4.png");
loadSprite("BG1", "sprites/BG1.png");
loadSprite("BG3", "sprites/BG3.png");
loadSprite("BG2", "sprites/BG2.png");
loadSprite("plat1", "sprites/Moving Platfrom_G.png");
//coin
loadSprite("coin", "sprites/coin1_16x16.png", {
  sliceX:15, sliceY:1,
  anims: { 'coin-anim': { from: 0, to: 14, loop:true }}
});

function spear(){
  return{
    id:"spear",
    require:["pos", "area", "sprite"],
    add(){
      this.play('spear-anim')
    }
  }
}

function spikes(){
  return {
    id:"spikes",
    require:["pos", "area", "sprite"],
    add(){
      this.play('spikes-anim')
    }
  }
}
function coinanim(){
  return {
    id:"c",
    require:["pos", "area", "sprite"],
    add(){
      this.play('coin-anim')
    }
  }
}
function patrol(speed = 100, dir = 1) {
  return {
    id: "patrol",
    require: [ "pos", "area" ],
    add() {
      this.on("collide", (obj, col) => {
        if (col.isRight()) {
          dir = -dir
          this.flipX=true
        }
        else if(col.isLeft()){
          dir = -dir
          this.flipX=false
        }
      })
    },
    update() {
      this.move(speed * dir, 0)
    },
  }
}

function fire(speed = 140, dir = UP) {
  return {
    id: "fire",
    require: [ "pos", "area" ],
    add() {
      this.on("collide", (obj, col) => {
        if (col.isTop()) {
          this.flipY=true
        }
        else if(col.isbottom()){
           
          this.flipY=false
        }
      })
    },
    update() {
      this.move(dir, speed)
    },
  }
}
function water(){
  return{
    id:"w",
    require:["pos", "area", "sprite"],
    add(){
      this.play("water-anim")
    }
    
  }  
}
function plat(){
  return{
    id:"p",
    require:["pos", "area", "sprite"],
    add(){
      this.play("plat-anim")
    }

  }  
}
function falling(){
  return{
    id:"b",
    require:["pos", "area", "sprite"],
    add(){
      this.play("falling-block")
    }

  }  
}


setGravity(750)
const map = [
  [
  "#                                                               #",
  "# T           o      o  T                   T                   #",
  "#             o     +o           &                              #",
  "#            +o                  -                              #",
  "#                                -oo                         S  #",
  "#   B   @      XXXXXX            -^ s          oB      @    +   #",
  "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$        ",
  "********************************************************        ",
  ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>        ",
    ],

  // TODO: implement platforms and gaps btwn land and water --> done
  // TODO: change font of coins collected + add lives
  // TODO: Have snack that add lives back 
  // TODO: add mobs
  //LEVEL 2: have water droplets as mobs that walk back and forth - use platforms to dodge them 
  // LEVEL 3: have water droplets as mobs on land and in air + traps - final prize is yarn 
  [ 
      "#                                                            #",
      "#                o                                           #",
      "#                o                                           #",
      "#T          T   +o                                           #",
      "#                                                        &   #",
      "#         C   _                _         0               -   #",
      "#         _                              0               -   #",
      "#  B   o #   0  #      XXX ^  ooo       0     @    X   S - s #",
      "$$$$$$   $$$$$$    $$$$$$$$$$$$$$$  $$$$$$$$$$$$$$$$$$$$$$$$$$",
      "******   ******    ***************  **************************",
      ">>>>>>   >>>>>>    >>>>>>>>>>>>>>>  >>>>>>>>>>>>>>>>>>>>>>>>>>",
    
  ],
  [
  "#                                                            #",
  "#                               T                            #",
  "#                                                            #",
  "#                          C 0      @     _  bbbbb +y        #",
  "#              ,     0     o        _                        #",
  "#     ooooooooo  0      # +o    B       XXXXX                #",
  "#  +    ,      $$$$$$$$$     $$$$$   $$$$$$$$$$$$            #",
  "#              *********     *****   ************            #",
  "#              >>>>>>>>>     >>>>>   >>>>>>>>>>>>            #",
    ],
] 

const levelConf = {
    tileWidth:64,
    tileHeight:64,
   
    tiles:{
      "g":()=>[sprite('grass'), area(), body({isStatic:true}), scale(4) ],
      "$": ()=>[
        sprite('grass2'), area(), body({isStatic:true}), scale(3.65)],
      "*":  ()=>[
          sprite('dirt'), area(), body({isStatic:true}), scale(3.65)],
      ">":  ()=>[
        sprite('deeperdirt'), area(), body({isStatic:true}), scale(5.96)],
      "#":()=>[
        rect(4,4), opacity(0), area(), body({isStatic:true})
      ],
      "+":()=>[
        sprite('floatinggrass'), area(), body({isStatic:true}), scale(2.5)],
      "@":()=>[
        sprite('rchicken'), area(), anchor("bot"), body(), scale(1.5), offscreen({ hide: true, }), "health"
      ],
      "o":()=>[
        sprite('coin'), area(),anchor("bot"), coinanim(), scale(1.9), offscreen({ hide: true}) ,"coin"],
      "S":()=>[sprite('salmon'), area(), anchor("bot"), body(), scale(2), "salmon" ],
      "C":()=>[sprite('cake'), area(), anchor("left"), body(), scale(1.3), "health"],
      "^":()=>[sprite('spear'), area(), spear(), body({isStatic:true}), scale(2.6), "damage"],
      "&":()=>[sprite('concrete'), anchor("topleft"), scale(4)],
      "-":()=>[sprite('bricks'), anchor("topleft"), scale(4)],
      "s":()=>([sprite('stone'), anchor("topleft"), scale(3)]),
      "T":()=>[sprite('tree'), anchor("topleft"), scale(2.9)],
      "B":()=>[sprite('bush'),anchor("topleft"), scale(2)],
      "X":()=>[sprite('spikes'), area(), body({isStatic:true}), spikes(), scale(3), "damage"],
      "0":()=>[sprite('watersprite'),  area(), body({isStatic:true}),offscreen({ hide: true }), anchor("top") , water(), patrol(), scale(0.25), "damage"],
      "_":()=>[sprite('plat1'), area(), body({isStatic:true}), scale(1.8), ],
      ",":()=>[sprite('PlatB'), area(), body({isStatic:true}), scale(2), plat(), patrol() ], 
      ".":()=>[sprite('fire'), fire(), area(), body({isStatic:true}), fire(), scale(2.5), "damage"],
      "y":()=>[sprite('yarn'), area(), body(), scale(1.4), "yarn"],
      "b":()=>[sprite('fallingblock'), area(), body({isStatic:true}), scale(2.5), "fblock"],
    }
  
  }
let lives = 3;

function respawnPlayer() {
   if(this.lives > 0){
    this.gameObj.pos = vec2(350, 440) 
  }
}
function update() {
  onUpdate(() => {
    if(this.gameObj.pos.Y <1000){
      play("score")
      this.respawnPlayer()
    }
  })
}
  scene("game", ( { levelId, coins, lives } = { levelId: 2, coins: 0, lives: 3 }) => {
  

    add([
      sprite('bg-1'),
      fixed(),
      scale(4)
    ])
    add([
      sprite('bg-1'),
      fixed(),
      pos(1000,0),
      scale(4)
    ])
    add([
      sprite('bg-2'),
      fixed(),
      scale(4)
    ])

    add([
      sprite('bg-2'),
      fixed(),
      pos(1000,0),
      scale(4)
    ]).flipX=true

    add([
      sprite('bg-3'),
      fixed(),
      pos(0,200),
      scale(4)
    ])

    add([
      sprite('bg-3'),
      fixed(),
      pos(1000,200),
      scale(4)
    ]).flipX=true

    add([
      sprite('bg-4'),
      fixed(),
      pos(0,400),
      scale(4)
    ])

    add([
      sprite('bg-4'),
      fixed(),
      pos(1000,400),
      scale(4)
    ]).flipX=true
  
 const level = addLevel(map[levelId], levelConf)
    level.use(scale(1.4))
    
 let hasChicken = false
    
// add a character to screen
const player = add([
	// list of components
	sprite("idle"),
  scale(5),
  area({shape: new Rect(vec2(0), 10, -14) }),
  anchor('center'),
  doubleJump(),
  body(),
	pos(350, 440), {
    speed:140,
    direction:'right',
    
  },
  "player"
])
    const score = add([
      text(coins),
      pos(24, 24),
      
      fixed(),
    ])

    const life = add([
      text(lives),
      pos(24, 70),
      fixed(),
    ])
    
player.onUpdate(() =>{
  // center camera to player
  camPos(player.pos.x +440, player.pos.y)
  
})


player.play('idle-anim')


onKeyDown('right', () => {
  if (player.curAnim() !== 'walk-anim' && player.isGrounded()) {
    player.use(sprite('walk'))
    player.play('walk-anim')
   
  }

   player.move(player.speed, 0)
})

onKeyRelease('right', () =>{
  player.use(sprite('idle'))
  player.play('idle-anim')
})


onKeyDown('left', () => {
  if(player.curAnim() !=='walk-anim' && player.isGrounded()) {
    player.use(sprite('walk'))
    player.play('walk-anim')
  }
  
  player.move(-player.speed,0)
})
onKeyRelease('left', () =>{
  player.use(sprite('idle'))
  player.play('idle-anim')
})
onKeyPress('down', ()=>
  {
    if(player.curAnim() !=='laying-anim' && player.isGrounded()) {
      player.use(sprite('lay'))
       player.play('laying-anim')
    
    }
    wait(3, ()=>{
      player.use(sprite('sleep'))
    })
    
  })


onKeyRelease('down', () =>{
  player.use(sprite('idle'))
  player.play('idle-anim')
})

    onKeyDown('up', ()=>
      {
        if(player.curAnim() !=='run-anim' && player.isGrounded()) {
          player.use(sprite('run'))
           player.play('run-anim')
          player.doubleJump()
          
        }

      })


    onKeyRelease('up', () =>{
      player.use(sprite('idle'))
      player.play('idle-anim')
    })
onUpdate( () => {
    if(player.direction =='left'){
      player.flipX=true

    }
    else{
      player.flipX=false
    }
})

    
/*
onKeyPress('space', ()=>{
  player.use(sprite('run'))
  player.play('run-anim')
  
  player.move(30,30)
})
onKeyRelease('space', () =>{
  player.use(sprite('idle'))
  player.play('idle-anim')
})
*/ 
    player.onCollide("health", (a) => {
      destroy(a)
      player.speed = 400
      
      
      wait(7, () => {
          player.speed = 140
      })
      hasChicken = false
     // play("powerup")
    }) 
    player.onCollide("coin", (c)=>{
      destroy(c)
      coins+=1
      score.text = coins
    })

player.onCollide("salmon", ()=>{
  go("game", {
    levelId: levelId + 1,
    coins: coins,
    lives: lives,
  })
})
player.onCollide("fblock", (b)=>{
    b.play("falling-block")
  wait(1,()=> {
    destroy(b)
  })
  
   
})
    player.onCollide("damage", () =>{
      if(lives>0){
        lives-=1
        life.text = lives
        if(lives==0){
          go("lose", {
            levelId: levelId,
            coins: coins,
          })
             }
      }
    })

    
    player.onCollide("yarn", ()=>{
     go("win")
   })
  }) // end of "game" scene


scene("lose", () => {
  add([
    text("You Lose"),
  ])
  onKeyPress(() => go("game"))
})

scene("win", () => {

  const cat = add([
    // list of components
    sprite("chicken"),
    scale(10),
   
    fixed(),
    pos(width()/2,height()/2)
    
  ])

  
  add([
    sprite('BG1'),
    fixed(),
    scale(4)
  ])

  add([
    sprite('BG2'),
    fixed(),
    scale(4)
  ])



  add([
    sprite('BG3'),
    fixed(),
    pos(0,200),
    scale(4)
  ])


 
  add([
    text("You Win!"), pos(550,200), 
   
  ])
  
   cat.play('idle-anim')
  onKeyPress(() => go("game"))
})


go("game")