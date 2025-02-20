import * as T from "../_type"

import * as Composite from '../render/composite'


import Games from "../game/games"
import CollisionPool from "../game/systems/collisionPool"
import NPCPool from "../game/systems/NPCPool"
import Camera       from '../game/systems/camera'

import Render from "../render/_render"

import Bat from "./bat"
import Window from '../render/windows';
import Textures from "../render/textures"


export default class Game extends Games {

  public renderer : Render;
  public iniName  : string = "lvl01";

  public drawTypeOrder : Array<string> = ["level", "ui"]

  public    gravityStr : T.Point = {x:0,y:50};
  public    zoom       : T.Box =  {w:3,h:3};

  public gameSize   : T.Box = {w:480, h:864};
  // protected gameHeight : number = ;


  // public tileSize : number = 16;
  // public displaytileSize : number = 48;

  public assetList : T.assetList = {
    // tileWidth: 50,
    square   : {w:16,h:16},
    source   : "tileset_16x16_5A5268.png",
    // images   : []
  }

  public displaytileSize : T.Box = 
   {w:this.assetList.square.w * this.zoom.w,
    h:this.assetList.square.h * this.zoom.h};

  public collisions : CollisionPool;
  public archetypes : NPCPool;
  public camera     : Camera;

  constructor(){
    super();
    this.renderer   = new Window();

    Render.emptyTex = Textures.createTexToBlitOn(2048,2048);

    this.collisions = new CollisionPool(this);
    this.archetypes = new NPCPool(this);
    this.camera     = new Camera       (this);

  }

  public loop = () => {
    this.collisions.update();
    this.archetypes.update();
    this.camera    .update();
  }

  public async init(){

    Render.canvas.all[this.iniName] = {};
    Render.canvas.all[this.iniName]["level"] = 
      await this.loadTiled(this.iniName + ".ini");
    
  }


  // Jusse en attendant : TODO
  public npcBuilder(npcArr : Array<string>, cellWidth : number, playGlayer: number) : Array<Composite.Snap>{
  //  : Array<T.Picture>{
    // let BTCH : Array<T.Picture> = [];
    let bat : Bat = new Bat(this, {x:16,y:16}, playGlayer);
      // , pic) ;
    // pic.x = 300;
    // pic.y = 400;
    // pic.layer = 100;
    // BTCH.push(pic);
    // return BTCH;
    return bat.anims[0].frames;

  }

}