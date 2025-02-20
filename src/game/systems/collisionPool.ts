import Systems from './_system'
import Collision from '../collisions/_collision'
import * as C from "../collisions/states"
import * as T from "../../_type"
import NPC from '../archetypes/npcs/_npc';
import Games from '../games';

export default class CollisionPool extends Systems {
  protected sysName: string = 'CollisionPool';
  public cpool : Array<Collision> = [];
  // private game : Games;

  constructor(game : Games){
    super(game);
    // this.game = game;

  }

  public update(){
    this.cpool = this.cpool.filter((a) => (!a.deleteMe));
    
    let all : Array<Collision> = this.cpool.filter((a) => (a.npc!=null && !a.npc.rootPicture.hidden) || a.npc==null);
    for(let i = 0; i < all.length; i++){
      if(all[i].npc!=null) all[i].npc.activeEffects = [C.CollideTypes.none,C.CollideTypes.none,C.CollideTypes.none,C.CollideTypes.none];
    }


    
    all.forEach((element) => {
        let dupes : Array<NPC> = [];

        all.filter((a)=>((a.from & element.to) && a.npc!=null))
        .map((a)=>{return a.npc})

        // avoid dupes (hitting oneself) slow buteverything i could find suckored hardz0rs
        .filter((a) => {

          if(element.npc?.sId === a.sId) return false;

          for(let j = 0; j< dupes.length; j++){
            if(dupes[j].sId === a.sId) return false;
          }

          dupes.push(a);
          return true;
        })
        // console.log(dupes);
        // if(element.npc?.dbgName === "scorpion") {console.log(dupes); console.log(element);}
        element.update(dupes);
    });

  }
  public scale(floats: T.Box){
    this.cpool.forEach((elt)=>{
      elt.scale(floats);
    })
  }

  public scaleTo(floats: T.Box){
    this.cpool.forEach((elt)=>{
      elt.scaleTo(floats);
    })
  }
}
