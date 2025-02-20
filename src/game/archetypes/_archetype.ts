import * as T from '../../_type'
// import * as P from './properties'

/**
 * Archetypes are property sets
 */
export default abstract class Archetype {
  public sId : number;
  private static count : number = 0;
  public dbgName : string = 'not undefined';
  
  // public static pool : {[id:number]:Archetype} = {};
  
  constructor(){
    // this.selfGo = pSelf;
    this.sId = Archetype.count;
    Archetype.count += 1;
    // Archetype.pool[this.sId] = this;

    // this.properties = Archetype.merge(this.properties, Archetype.defaultProperties)
  }

  public abstract refresh() : void;

  public abstract destroy() : void;

  // public abstract scale(floats : T.Box) : void;
  // public static useShader(gameobject: T.gameobject){
  //   gameobject.shaderID = this.suggestedShader
  // }


}