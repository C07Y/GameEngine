import Archetype from '../archetypes/_archetype'
import Games from '../games'
import * as T from '../../_type';

// export enum allSystems {
//   camera       =  1 << 0,
//   collision    =  1 << 1,
//   keyboard     =  1 << 2,
//   interactions =  1 << 3,
//   all          = (1 << 4) - 1
// }

export default abstract class Systems {
  public abstract update() : void;
  public abstract scale(floats : T.Box) : void;
  public abstract scaleTo(floats : T.Box) : void;

  protected game : Games;

  constructor(game : Games){
    this.game = game;
    // super();
  }

  public static init(sys /* : allSystems */){
    // if(sys & allSystems.keyboard    ) new Keyboard();        
    // if(sys & allSystems.collision   ) new C.CollisionPool();
    // if(sys & allSystems.camera      ) new Camera();        
    // if(sys & allSystems.interactions) new Interactions();   

  }

  // public destroy(): void {
  //   delete Archetype.pool[this.sId];
  // }

}
