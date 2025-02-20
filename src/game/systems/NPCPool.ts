import NPC from "../archetypes/npcs/_npc"
import Systems from "./_system";
import * as T from '../../_type';

export default class NPCPool extends Systems {
  public pool : {[id:number]:NPC} = {};
  // private static count : number = 0;


  public addToPool(refreshable : NPC){
    this.pool[refreshable.sId] = refreshable;
  }

  public update(){
    for(let i in this.pool){
      // if(this.pool[i].dbgName == "PLAYER") {console.log("PLAYER");}
      this.pool[i].refresh();
    }
  
  }

  public scale(floats : T.Box){
    for(let i in this.pool){
      this.pool[i].scale(floats);
    }
  }
  public scaleTo(floats : T.Box){
    for(let i in this.pool){
      this.pool[i].scaleTo(floats);
    }
  }
}