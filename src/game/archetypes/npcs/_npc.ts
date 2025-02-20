import Archetype from '../_archetype'
import * as C from "../../collisions/states"
import Collision from '../../collisions/_collision'
import * as S from "./states"
// import * as A from '../../gameobj/animation/anim'
import * as T from '../../../_type'
// import * as E from '../../../game1/enums'
import Games from '../../games';
import Assets  from "../../../parsers/_assets"
import Render  from "../../../render/_render"
import { Cycler } from '../../systems/time';
import Textures from '../../../render/textures'
import * as Comp from '../../../render/composite'


export default abstract class NPC extends Archetype {
  public abstract health : number;
  public imgName : string = "°I° °HAVE° °NO° °NAME°";

  public visual : Array<Comp.Snap>;
  public anims  : Array<Comp.Animation>;

  // public composites : Array<Comp.Composite>;
  // public bounds : T.Bounds;

  public surface : T.Surface;
  // Replace below with above (wh with Surface)
  // public width  : number;
  // public height : number;


  public abstract properties;
  public direction = T.Direction.right;



  public cycler : Cycler;

  public game : Games;
  
  public collisions : Array<Collision> = [];

  public collisionPadding : T.Point = {x:1,y:1};

  protected ogBounds : T.Bounds;

  // HP captures player, not the other way around
  // public captures : {[sId:number]:NPC};

  // public ownings : Array<Array<NPC>> = [
  //   [],  // Zones
  //   []   // other npcs
  // ];

  public  state : S.NPCStates = S.NPCStates.idle;

  public activeEffects : Array<C.CollideTypes> =
  [C.CollideTypes.none, C.CollideTypes.none, C.CollideTypes.none, C.CollideTypes.none];


  constructor(game : Games, bounds: T.Bounds, layer : number, properties : T.RenderProps = {}){
    super();
    this.surface = {
      x: bounds.x,
      y: bounds.y,
      w: bounds.w,
      h: bounds.h,
      layer : layer,
      properties : properties
    }

    this.ogBounds = bounds;

    // this.rootPicture = picSelf;
    // this.rootPicture.file = this.imgName;

    this.game = game;
    this.game.archetypes.addToPool(this);
    
  }

  /*
  public loadSprite(){
    this.rootPicture.texture = Textures.createSprite(this.game.assetList.tileset.image, this.ogBounds);
    console.log(this.rootPicture.texture);
  }

  public scale(floats: T.Box){
    this.width    *= floats.w;
    this.height   *= floats.h;
    this.rootPicture.x *= floats.w;
    this.rootPicture.y *= floats.h;
  }
  public scaleTo(floats: T.Box){
    let oldWidth  = this.width;
    let oldHeight = this.height;

    this.width    = this.ogBounds.w * floats.w;
    this.height   = this.ogBounds.h * floats.h;
    this.rootPicture.x *= (this.width / oldWidth );
    this.rootPicture.y *=  this.height/ oldHeight;
  }
  */

  // protected addCollision(collision: C.Collision){
  //   // this.game.collisions.cpool[this.sId] = collision;
  //   // this.collisions.push(collision);
  // }

  public destroy(): void {
  //     this.rootPicture.renderDelete = true;
  //     delete Archetype.pool[this.sId];
  }

  protected static merge(currArch: {[property:string]:any}, nextArch: {[property:string]:any}):  {[property:string]:any}{
    for(const pr in nextArch){
      currArch[pr] = nextArch[pr]
    }
    return currArch
  }

}