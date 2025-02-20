import Games from "../game/games"
import Textures from "../render/textures";

export default class Assets {
  // private static imagePromises: Array<Promise<void>> = [];
  private static textures : { [id: string]: WebGLTexture;} = {};
  // private static texts: { [id: string] : Promise<string>;} = {};

  public static getTex(fileName:string){
    return Assets.textures[fileName];
  }

  public static async addImage(path:string, file:string): Promise<void>{
    let img = new Image();
    img.src = path + file;
    img.decode().then(() => {
      Assets.textures[file] = Textures.createTexture(img);
    })
  }

  public static async loadText(file:string): Promise<string>{
      return fetch(file).then((x)=>x.text());
  }

  public static async loadAllImagesInFolder(folderPath : string) : Promise<Array<Promise<void>>>{

    let xhr = new XMLHttpRequest();
    let jobs : Array<Promise<void>>;
    xhr.open('GET', folderPath, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let files = xhr.responseText.split('\n');
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          
          if (file.trim().length > 0) {

            let fspl : Array<string> = file.split('.');
            let fileType = fspl[fspl.length-1];
            
            if(Assets.isImgExt(fileType)){
              jobs.push(Assets.addImage(folderPath, file));
            } else console.log('File is not an image: ' + file);
          }
        }
      }
    };
    xhr.send();
    return jobs;
  }

  private static imgExts: Array<string> = ['png','jpg','gif', 'jpeg']
  private static txtExts: Array<string> = ['nw','txt', 'vert', 'frag']

  private static isTxtExt(ext:string){
    return Assets.imgExts.indexOf(ext) > - 1;
  }
  private static isImgExt(ext:string){
    return Assets.txtExts.indexOf(ext) > - 1;
  }

}