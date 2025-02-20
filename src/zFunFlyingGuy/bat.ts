// Core imports
import Games from "../game/games"
import * as T  from '../_type'
import Enemy     from '../game/archetypes/npcs/enemies/_enemy'

import mayKeys from "./keyboard"
import * as A         from "../game/anim"

// Collision imports
import NPCCollision from "../game/collisions/npcCollision"
import * as C       from "../game/collisions/states"
import Collision from "../game/collisions/_collision"

// Game specific imports
// import * as E from "../enums"
import { Cycler } from "../game/systems/time"
import Camera from "../game/systems/camera"

import * as S from "../game/archetypes/npcs/states"

import * as Time from "../game/systems/time"

// import * as Com from "../components/components"
  import * as Composite from "../render/composite"

import Textures from "../render/textures"
import Assets from "../parsers/_assets"

// type Collection = Com.Health;

export default class Bat extends Enemy {
  // Overrides
  public health = 3;

  public properties;

  public readonly maxHealth = 6;

  public jumpCycle: Time.Cycler = {up:{duration:250,loop:false}};

  public dbgName : string = 'BAT';

  public imgName = 'tileset_16x16_5A5268.png'

  
  
  public textures : Array<T.Tex> = [];
  
  private Pkeyboard : mayKeys;
  
  public readonly speed  = {x:250,y:250};
  protected readonly gravityForce : T.Point = {x:0,y:1};


  constructor(game: Games, pos: T.Point, layer : number){
    let width : number = 16;
    let height: number = 16;
    

    super(game, 
      {x: pos.x, y: pos.y, w: width, h: height}
      , layer);

      // SET TO GAME CAMERA
    game.camera.setAnchor(this);

    this.Pkeyboard = new mayKeys(this);

    this.anims.push(new Composite.Animation(
      [
        new Composite.Snap([
          {x:0,y:0, w: width, h:height, properties:{}, layer:0,
            texture:Textures.createSprite(
                      Assets.getTex(this.imgName), 
                      { 
                        x: (426 % 50) * width,
                        y: Math.floor(426/50) * height,
                        w: width,
                        h: height
                      })
          }]),
        new Composite.Snap([
          {x:0,y:0, w: width, h:height, properties:{}, layer:0,
            texture:Textures.createSprite(
                      Assets.getTex(this.imgName), 
                      { 
                        x: ((426 + 1) % 50) * width,
                        y: Math.floor(426/50) * height,
                        w: width,
                        h: height
                      })
          }])
      ])

    this.surface.layer = layer;

    game.addCollisionTo(this,
      new NPCCollision(C.CollideLayers.player, (C.CollideLayers.all), (C.CollideTypes.block | C.CollideTypes.climbable)),
      {x:0,y:0,w:width,h:height}
    )

  }

  private lastDir : T.Direction = 0;
  public update(){
    // this.Pkeyboard.update();

    // // if(this.direction & T.Direction.up) this.lastDir = 0;
    // // else if(this.direction & T.Direction.left) this.lastDir = 1;
    // // else if(this.direction & T.Direction.down) this.lastDir = 2;
    // // else if(this.direction & T.Direction.right) this.lastDir = 3;
    // // this.lastDir = this.direction == 0 ? this.lastDir : this.direction;
    // this.direction = T.Direction.right;
    // this.movement.x = this.speed.x * .25;
    // // for(let i = 1; i < S.NPCStates.allStates; i = i << 1){

    //   if(this.state == S.NPCStates.flap){
    //     this.gravityForce.y = -3;
    //     // this.animation = this.animations[1];
    //     this.rootPicture.texture = this.textures[1];
    //   } else {
    //     this.gravityForce.y =  2.5;
    //     this.rootPicture.texture = this.textures[0];
    //   }
        
  }

  // this.selfGo.texture = game.renderer.createSprite(game.assetList.tileset.image, bounds);

  private buildAnimations(){
    // for(let i = 0; i < 4; i++){
      // this.selfGo.te
      // this.animations[0] = new A.Anim(
      //   this, 
      //   [
      //     {duration: 150},
      //     {duration: 150}
      //   ], //[200],
      //   "tileset_16x16_5A5268.png",
      //   (426 % 50) * 16,
      //   Math.floor(426/50) * 16, 
      //   16, 16
      // );

      // this.animations[1] = new A.Anim(
      //   this, 
      //   [
      //     {duration: 150}
      //   ], //[200],
      //   "tileset_16x16_5A5268.png",
      //   ((426 + 1) % 50) * 16,
      //   Math.floor(426/50) * 16, 
      //   16, 16
      // );

    // }
  }

}