
import NPC from '../_npc'
import * as T from "../../../../_type"
import * as A from '../../../anim'

// import * as E from '../../../../game1/enums'

import Games from '../../../games'
import * as C from "../../../collisions/states"
// import * as Time from "../../../systems/time"
import { Time } from '../../../systems/time';


export default abstract class Enemy extends NPC {

    protected        lifetime : number = 0;
    protected      animations : Array<A.Anim> = [];
    protected      animation  : A.Anim;
    // private focus : NPC;
    // public properties = { 
    //   'focus': null
    // };
    public abstract health : number;

    public direction : T.Direction = 0;
  
    public cycles : {[id:string]:Time} = {};

    // private gravityStr              : T.Point; // Up down
    protected movement              : T.Point = {x:0,y:0}; // Up down, left right movement from npc
    protected abstract speed        : T.Point; // Up down, left right movement factor from npc
    protected abstract gravityForce : T.Point; // Up down, Left right "natural fall"
    // protected abstract gravityStr   : T.Point; // Up down, Left right "natural fall" factor

    protected abstract update();

    /*
    public scale(floats : T.Box){
      this.width         *= floats.w;
      this.height        *= floats.h;

      this.rootPicture.x *= floats.w;
      this.rootPicture.y *= floats.h;

      this.speed.x       *= floats.w;
      this.speed.y       *= floats.h;

      // this.gravityStr     = this.game.gravityStr;
    }

    public scaleTo(floats : T.Box){
      let oldWidth = this.width;
      let oldHeight = this.height;

      this.width  = this.ogBounds.w *floats.w;
      this.height = this.ogBounds.h *floats.h;

      let ratioX = this.width  /  oldWidth 
      let ratioY = this.height /  oldHeight

      this.rootPicture.x  *= ratioX;
      this.rootPicture.y  *= ratioY;

      this.speed.x       *= floats.w;
      this.speed.y       *= floats.h;

      // this.gravityStr = this.game.gravityStr;
    }
    */
  
    constructor(game:Games, bounds : T.Bounds, layer : number, properties : T.RenderProps = {}){
        super(game, bounds, layer, properties);
        // this.gravityStr = game.gravityStr;
    }

    public refresh(){
      this.lifetime += Time.delta;

      this.update();

      this.movement.x -= this.gravityForce.x * this.game.gravityStr.x;
      this.movement.y -= this.gravityForce.y * this.game.gravityStr.y;

      // if(this.dbgName=="PLAYER") console.log(this.activeEffects);
      if( this.movement.x != 0 &&
        (
          (this.movement.x < 0 && !(this.activeEffects[1] & C.CollideTypes.block) && this.direction & T.Direction.right) ||
          (this.movement.x < 0 && !(this.activeEffects[3] & C.CollideTypes.block) && this.direction & T.Direction.left ) ||
          (this.movement.x > 0 && !(this.activeEffects[3] & C.CollideTypes.block) && this.direction & T.Direction.right) ||
          (this.movement.x > 0 && !(this.activeEffects[1] & C.CollideTypes.block) && this.direction & T.Direction.left )
        ) || this.movement.y != 0 && (
          (this.movement.y < 0 && !(this.activeEffects[0] & C.CollideTypes.block) && this.direction & T.Direction.down ) ||
          (this.movement.y < 0 && !(this.activeEffects[2] & C.CollideTypes.block) && this.direction & T.Direction.up   ) ||
          (this.movement.y > 0 && !(this.activeEffects[2] & C.CollideTypes.block) && this.direction & T.Direction.down ) ||
          (this.movement.y > 0 && !(this.activeEffects[0] & C.CollideTypes.block) && this.direction & T.Direction.up   ) 
        )
        ){
          if     (this.direction & T.Direction.left ) this.visual.bounds.x -= this.movement.x / (1000 / Time.delta);
          else if(this.direction & T.Direction.right) this.visual.bounds.x += this.movement.x / (1000 / Time.delta);
          if     (this.direction & T.Direction.up   ) this.visual.bounds.y -= this.movement.y / (1000 / Time.delta);
          else if(this.direction & T.Direction.down ) this.visual.bounds.y += this.movement.y / (1000 / Time.delta);
      } 
      this.movement = {x:0,y:0};
      
      // TODO DO NOT UPDATE THIS HERE!!!!!!!!!!!
      this.gravityForce.y = 1;

      if(this.animation){
          this.animation.animate();
      }
    }

}