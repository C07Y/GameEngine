import * as T from "../_type"
import Render from "../render/_render"
import Assets from "../parsers/_assets"
import NPC    from "./archetypes/npcs/_npc"
import { Time,  Cycles } from "./systems/time"
import Textures from "../render/textures"

// import 

// namespace Animations {
  type eFrame = {
    tex : T.Tex
  }


  export class Anim {

    public frames : Array<T.Tex> = [];
    private cycles : Array<Cycles> = [];
    private step : number;
    // private step : number;
    // private ms : number;
    private self : T.Renderable;


    constructor(npcSelf : NPC, cycler : Array<Cycles>,
      fileName: string, offW: number, offH:number, width: number, height: number, atlasWidth : number = cycler.length){
      this.self = npcSelf.rootPicture;
      // this.frames = frames;
      this.cycles = cycler;

      // console.log(Assets.getTex('body.png'));
      for(let i = 0; i < cycler.length; i++){
        this.frames.push(
          Textures.createSprite(Assets.getTex(fileName),
              {x:offW + ((i % atlasWidth) * width),
              y:offH + (Math.floor(i / atlasWidth) * height),
              w:width,h:height})
        )
        new Time({"yo":cycler[i]});
      }

      this.step = 0;
      this.self.texture = this.frames[this.step];

    }
    
    public animate(){
      if(this.cycles[this.step].fired){
        // console.log(this.step);
        this.step = (this.step + 1) % this.cycles.length;
        this.cycles[this.step].fired = false;
        this.cycles[this.step].starttime = Date.now();
        this.self.texture = this.frames[this.step];
      } 

    }

    }
// }
