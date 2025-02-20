
// import Game from '../../game1/game';
import Archetype from '../archetypes/_archetype';
// import Games from '../games';

// export enum allSystems {
//   camera       =  1 << 0,
//   collision    =  1 << 1,
//   keyboard     =  1 << 2,
//   interactions =  1 << 3,
//   all          = (1 << 4) - 1
// }

export type Cycles = 
   {
    duration   : number, 
    loop?      : boolean,
    starttime? : number,
    fired?     : boolean, 
    elapsed?   : number
  }

export type Cycler = 
{[name:string]:Cycles};


export class Time extends Archetype {
  private static timeScale : number = 1;

  public static previousTimeStamp : number = 0;
  public static currentTimeStamp  : number = 0;
  public static delta             : number = 16;

  // public pool : Array<Cycles>;

  private static notmineALLMine : {[id:number]:Time} = {};
  public cycles : {[name:string]:Cycles} = {};

  // Lots of timings are created could be more efficient
  constructor(timingList : {[name:string]:Cycles}){
    super();
    // console.log("REW");
    Time.notmineALLMine[this.sId] = this;
    for(let i in timingList){
      timingList[i].starttime = Date.now();
      timingList[i].fired = false;

    }
    this.cycles = timingList;
  }

  public static init(){
    Time.delta = 16;
    Time.currentTimeStamp = Date.now();
  }


  public refresh(){}
  // public destroy(){}

  public static update(){
    // Time.notmineALLMine = Time.notmineALLMine.map((a) => {
      for(let i in Time.notmineALLMine){
        for(let j in Time.notmineALLMine[i].cycles){
          let c : Cycles = Time.notmineALLMine[i].cycles[j];

          c.elapsed = (Date.now() - c.starttime) / c.duration;
          
          c.fired = (Time.timeScale * c.elapsed >= c.duration) ||
                    (!c.loop && c.fired);
          
          if(c.fired && c.loop) c.starttime = Date.now();

      }
    }

  }

  public restart(){
    for(let i in this.cycles){
      this.cycles[i].starttime = Date.now();
      this.cycles[i].fired = false;
      this.cycles[i].elapsed = 0;

    }
    return this;
  }

  public destroy(){
    // Time.notmineALLMine[this.sId].cycles[]
    delete Time.notmineALLMine[this.sId]
  }
  
  public scale(){};

  public static scale(timeSpeedFloat: number){
    Time.timeScale *= timeSpeedFloat;
  }
}
