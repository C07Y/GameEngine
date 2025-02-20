// import Games from "./game/games";

import Render from "./render/_render";

export type Point = {
  x : number,
  y : number,
  z?: number
}

export type Box = {
  w : number,
  h : number,
  d?: number
}

export type Bounds = Point & Box;

export enum ShaderStates {
  yOrdered        = 1 << 0,
  reverseyOrdered = 1 << 1,
  camera          = 1 << 2

}


export enum Direction {
  up    = 1 << 0,
  left  = 1 << 1,
  down  = 1 << 2,
  right = 1 << 3
}



export type assetList = {
  square    : Box   ,
  source    : string,
  // images    : Array<string>,
  tileset  ?: Tex,
  grid     ?: Box,
  playLayer?: number
}

export type CellBuild = {
  tiles: Array<tilesLayer>,
  npcs: Array<string>,
  collisions: Array<boolean>,
  tileset    : Tex,
  square     : Box,
  playLayer  : number,
  grid       : Box
}

export type tilesLayer = {
  tileYX: Array<Array<number>>
}

export type Shader = {
  program: WebGLProgram,
  passes: Array<shaderPass>
}

export type Renderable = Surface & {
  texture      : Tex

  bg          ?: Tex & {overrideSize:boolean},
  mask        ?: Tex
}

export type Surface = Bounds & {
  scale       ?: Float32Array,
  properties   : RenderProps ,

  // Draw priority as a member of a composite
  // (low = high priority / displayed under high)
  layer        : number   ,
  hidden      ?: boolean  ,
  // remove      ?: boolean  ,
}

export type Tex = {
  // Self
  file         : string      ,
  image        : WebGLTexture,

}

export type RenderProps = {
  // Effects
  angle       ?: number      ,
  flip        ?: boolean     ,
  colorize    ?: Uint8Array  ,
  drawAsLight ?: boolean     ,

  // Shaders
  shaderID    ?: string      ,
  shaderState ?: ShaderStates
}

export type shaderPass = (
    renderable: Surface,
    targetSize: Box,
    shader: Shader
) => void


// export type Picture = Renderable & {

//   r?: {[layer:number]: Picture},
//   redraw       : boolean,
//   remove?      : boolean,
//   bg?          : Picture, // the solution to animated tilesets
//   mask?        : Picture,
//   childRenders?: Renderable
// } // draw once if no texture

// export type Canvas = {
//   // effect layers
//   all: {[game:string]:{[drawType:string]:Picture}},
// }

// TODO Make
// drawType an enum and
// list combinations/orders of drawTypes
// as drawing modes