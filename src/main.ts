import Render from "./render/_render"
import Assets from "./parsers/_assets"
import { Keyboard } from "./game/input/keyboards/_keyboard"

// import DefaultShaders from './shaders/defaultShaders'
// import CameraShader   from "./shaders/cameraShader"
import * as Level from './game/level'

import Archetype    from './game/archetypes/_archetype';
import * as C       from './game/systems/collisionPool'
import Camera       from './game/systems/camera'
// import Interactions from './game/archetypes/systems/interactions'

import * as M from './game/input/mouse/_mouse'
import { Time } from "./game/systems/time";

import FFG from './zFunFlyingGuy/game'
// import Game1 from './game1/game'
import Games from './game/games'

// import DefaultShader
// import Game from './game1/game'
import DefaultShader from './render/shaders/defaultShader';
import Window from "./render/windows";
import Textures from "./render/textures";

// let game : ffG;
// let game2 : Game1;



const init = async () => {

  // new Render();
  console.log("FDSA");
  let ffg = new FFG();
  new DefaultShader(ffg);

  Time.init();

  await ffg.init()

    ffg.camera.setLevelSize(
      ffg.assetList.grid
    );
    Games.pool.push(ffg);

}

const mainLoop = () => {
  Time.previousTimeStamp = Time.currentTimeStamp;
  Time.update();
  
  for(let i = 0; i < Games.pool.length; i++){
    // Games.pool[i].loop();
    Window.renderGame2(Games.pool[i]);

  }
  
  Keyboard.updateKeys();

  Time.currentTimeStamp = Date.now();
  Time.delta = Time.currentTimeStamp - Time.previousTimeStamp;

  if(Time.delta > 500) Time.delta = 500;
  if(Time.delta == 0 ) Time.delta =   1;
  // console.log(Assets.getTex("tileset_16x16_5A5268.png"));

  // console.log(Archetype.delta);
  requestAnimationFrame(mainLoop);

}


init().then(() => {  console.log("WADA") 
 Textures.backupTex = Assets.getTex("tileset_16x16_5A5268.png")
console.log(Assets.getTex("tileset_16x16_5A5268.png"));


  mainLoop()});


/*
const init = async () => {

  Render.init()

  DefaultShaders.initShaders()
  CameraShader.initShaders();
  
  game = new Game();
  Game.delta = 16;
  Game.currentTimeStamp = Date.now();

  await Level.Level.load("lvl01.ini", game)


}



const mainLoop = () => {
  Game.previousTimeStamp = Game.currentTimeStamp;
  Time.update();
  
  game.loop();

  Render.renderAll();
  // M.Mouse.update();

  Game.currentTimeStamp = Date.now();
  Game.delta = Game.currentTimeStamp - Game.previousTimeStamp;

  if(Game.delta > 500) Game.delta = 500;
  if(Game.delta == 0 ) Game.delta = 1;

  // console.log(Archetype.delta);
  requestAnimationFrame(mainLoop);

}

init().then(() => mainLoop());


// new PlayerChar()

*/