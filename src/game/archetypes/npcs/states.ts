export enum NPCStatesN {
  idle          =   0,
  walk          =   1,
  jump          =   2,
  atk           =   3,
  dash          =   4,
  ranged        =   5,
  react0        =   6,
  react1        =   7,
  react2        =   8,
  defend        =   9,
  climbing      =  10,
  mouseCollide  =  11,
  mouseClick    =  12,
  mouseUp       =  13,
  startJump     =  14,
  flap          =  15,
  length        =  16
}

export enum NPCStates {
    idle          =   1 <<  NPCStatesN.idle          ,
    walk          =   1 <<  NPCStatesN.walk          ,
    jump          =   1 <<  NPCStatesN.jump          ,
    atk           =   1 <<  NPCStatesN.atk           ,
    dash          =   1 <<  NPCStatesN.dash          ,
    ranged        =   1 <<  NPCStatesN.ranged        ,
    react0        =   1 <<  NPCStatesN.react0        ,
    react1        =   1 <<  NPCStatesN.react1        ,
    react2        =   1 <<  NPCStatesN.react2        ,
    defend        =   1 <<  NPCStatesN.defend        ,
    climbing      =   1 <<  NPCStatesN.climbing      ,
    mouseCollide  =   1 <<  NPCStatesN.mouseCollide  ,
    mouseClick    =   1 <<  NPCStatesN.mouseClick    ,
    mouseUp       =   1 <<  NPCStatesN.mouseUp       ,
    startJump     =   1 <<  NPCStatesN.startJump     ,
    flap          =   1 <<  NPCStatesN.flap          ,
    allStates     =  (1 <<  NPCStatesN.length        ) - 1
}

