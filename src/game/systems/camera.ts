// import Archetype from "../_archetype"
import Systems from "./_system"
import NPC       from "../archetypes/npcs/_npc"
// import * as T    from "../../_type"
import Games   from "../games"
import * as T from "../../_type";

// type levelInfo = {
//   width : number,
//   height : number
// }

export default class Camera extends Systems {

  // private game : Games;

  private halfSize  : T.Box = {w:0,h:0};

  public x : number = 0;
  public y : number = 0;


  private anchor : NPC;
  // public afdasnchor: NPC;
  private pixel  : T.Box= {w:0,h:0};
  private grid   : T.Box= {w:0,h:0};
  // private pixelH  : number;
  // private pixelW  : number;
  // private gridH  : number;
  // private gridW  : number;

  constructor(game : Games){
    super(game);

    this.halfSize.w = game.gameSize.w / 2;
    this.halfSize.h = game.gameSize.h / 2;
  }

  public setAnchor(anch : NPC){
    this.anchor = anch;
  }

  public setLevelSize(size: T.Box){
    // this.level = {

      this.grid.w   = size.w;
      this.grid.h   = size.h;
      this.pixel.w  = size.w * this.game.displaytileSize.w;
      this.pixel.h  = size.h * this.game.displaytileSize.h;
    // }
  }

  public update() {
    // console.log(this.anchor);
    this.x =       this.anchor.rootPicture.x + this.anchor.width/2 - this.halfSize.w <= 0 ? 0 :
                     this.anchor.rootPicture.x + this.anchor.width/2 + this.halfSize.w >= this.pixel.w ? 
                       this.pixel.w - this.halfSize.w * 2    :
                     this.anchor.rootPicture.x + this.anchor.width/2 - this.halfSize.w;

    this.y =       this.anchor.rootPicture.y + this.anchor.height/2 - this.halfSize.h <= 0 ? 0 :
                     this.anchor.rootPicture.y + this.anchor.height/2 + this.halfSize.h >= this.pixel.h ? 
                       this.pixel.h - this.halfSize.h * 2    :
                     this.anchor.rootPicture.y + this.anchor.height/2 - this.halfSize.h;
  }

  public scale(floats: T.Box){
    this.pixel.w *= floats.w;
    this.pixel.h *= floats.h;
  }

  public scaleTo(floats: T.Box){
    this.pixel.w = this.grid.w * floats.w;
    this.pixel.h = this.grid.h * floats.h;
  }
}