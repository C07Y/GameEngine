import * as T from '../_type'

import * as Composite from '../render/composite'

import CollisionPool from "./systems/collisionPool"
import NPCPool from "./systems/NPCPool"
import Camera       from './systems/camera'

import NPC from './archetypes/npcs/_npc'

import Collision from './collisions/_collision'
import CollisionGrid from './collisions/gridCollision'
import * as C from './collisions/states'


import Render from '../render/_render'
import Assets from '../parsers/_assets'
import {Time} from './systems/time'

import Tiled from '../parsers/tiledParser'
import Textures from '../render/textures';

import * as Comp from "../render/composite"


export default abstract class Games {
  
  public abstract renderer        : Render;
  public abstract iniName         : string;
  public abstract gravityStr      : T.Point;
  public abstract zoom            : T.Box;
  public abstract displaytileSize : T.Box;
  public abstract assetList       : T.assetList;
  public abstract drawTypeOrder   : Array<string>;
  public abstract gameSize : T.Box;

  public viewpane : {[drawType:string]:Array<Comp.Composite>} = {}

  // should be game bounds

  public collisions : CollisionPool;
  public archetypes : NPCPool;
  public camera     : Camera;

  public static pool : Array<Games> = [];



  public abstract loop() : void;
  public abstract npcBuilder(npcArr : Array<string>, cellWidth : number, playGlayer : number) : Array<Composite.Snap>;
  public abstract init();

  public        getGameSize() : T.Box         { return this.gameSize;}
  public static getOrigin()   : string        { return Games.origin ;}

  private static origin : string = 'http://localhost:8003'


  private recurseImageLookup(play : {[layer:number]: T.Surface}) : Array<string>{
    let imgs : Array<string> = [];

    for(let i in play){
      let p : T.Surface = play[i];
      if(p.bg! && p.bg!.texture.file) imgs.push(p.bg!.texture.file)
      if(p.texture.file) imgs.push(p.texture.file)
      
      if(p.r){
        imgs.push(...this.recurseImageLookup(p.r));
      }
      
    }
    return imgs;
  }

  protected async loadTiled(iniFile : string) : Promise<T.Surface>{
    const cellR : T.CellBuild = await Tiled.loadIni(iniFile, this);
    this.assetList.tileset   = cellR.tileset;
    this.assetList.grid      = cellR.grid   ;
    this.assetList.square    = cellR.square ;
    this.assetList.playLayer = cellR.playLayer;

    let levelLayers : Array<T.Surface> = Tiled.blit(cellR.tiles, this);

    

    this.addCollisionTo(null,
      new CollisionGrid(cellR.collisions, this, 
        (C.CollideLayers.npc|C.CollideLayers.player), C.CollideTypes.block)
    )


    
    let npcComposites : Array<Composite.Snap> = this.npcBuilder(cellR.npcs, this.assetList.grid.w, this.assetList.playLayer * 10);

    for(let comp in npcComposites){
      npcComposites[comp].compose();

    }

    // Create image list (go down in T.Pictures.Texture.files and make a list)
    // let imgsToLoad : Array<string> = this.recurseImageLookup(play);
    // let imgsLoaded : Promise<void> = this.loadImages(imgsToLoad, "levels/"+this.iniName+"/");
    // loadImagesfrom npcbuilder

    // wait for levelLayers to complete
    // await levelLayers;


    // TODO: remove shader id because I A' A CAT
    let toRender : Composite.Snap = {x:0,y:0, 
      // shaderID: 'DefaultShader', 
      texture: {w:480,h:864},
      r: {}, layer: this.assetList.playLayer,
      redraw: true}


    for(let i = 0; i < (levelLayers).length; i++) {
      toRender.r[i] = {x:0,y:0,bg: levelLayers[i], texture:{w:0,h:0}, layer: i * 10, redraw: true}
    }

    toRender.r[this.assetList.playLayer].r = play;
    
    // Once the images are loaded, load the npc textures
    await imgsLoaded;
    for(let i in this.archetypes.pool){
      console.log("FAFDS");
      this.archetypes.pool[i].loadSprite();
    }
    
    return toRender
  }
  //

  public addCollisionTo(npc : NPC | null, collision: Collision, bounds : T.Bounds = {x:0,y:0,w:0,h:0}, isGlobal : boolean = false) : Collision {
    collision.npc = npc;

    collision.offX     = bounds.x * this.zoom.w;
    collision.offY     = bounds.y * this.zoom.h;

    collision.width    = bounds.w * this.zoom.w;
    collision.height   = bounds.h * this.zoom.h;

    collision.ogBounds = bounds;

    // if(npc?.dbgName == "scorpion"){

    //   console.log(npc?.dbgName);
    //   console.log(bounds.y * this.zoom);
    //   console.log({x:collision.offX, y: collision.offY, w:collision.width, h:collision.height})
    // }

    this.collisions.cpool.push(collision);
    if(npc!=null)npc.collisions.push(collision);
    return collision;
  }

  // private async loadImages(images : Array<string>, pr: string = '') : Promise<void> {
  //   for(let i = 0; i < images.length; i++){
  //     await Assets.loadImage(images[i], Games.getOrigin()+"/_assets/"+pr+images[i]);
  //     let texture = Textures.createTexture(await Assets.getImage(images[i]));
  //     Assets.addTex(images[i], texture.image);
  //     console.log(texture);
  //   }
  // }

  public scale(floats: T.Box){
    this.zoom = {w: Math.round((this.zoom.w * floats.w)*100) / 100, h: Math.round((this.zoom.h * floats.h)*100) / 100};
    // console.log(this.zoom);
    this.displaytileSize = {
      w: this.assetList.square.w * this.zoom.w,
      h: this.assetList.square.h * this.zoom.h
    }

    this.gravityStr.x *= this.zoom.w;
    this.gravityStr.y *= this.zoom.h;

    this.archetypes.scaleTo(this.zoom);
    this.collisions.scaleTo(this.zoom);
    this.camera.scaleTo(this.zoom);
    // Timings.scale(float);

  }

  public scaleTo(floats: T.Box){
    this.zoom = floats;
    
    this.displaytileSize = {
      w: this.assetList.square.w * this.zoom.w,
      h: this.assetList.square.h * this.zoom.h
    }

    this.gravityStr.x *= this.zoom.w;
    this.gravityStr.y *= this.zoom.h;

    this.archetypes.scaleTo(this.zoom);
    this.collisions.scaleTo(this.zoom);
    this.camera.scaleTo(this.zoom);
    // Timings.scale(float);

  }
}