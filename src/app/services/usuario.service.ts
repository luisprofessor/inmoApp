import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage-angular';
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _storage: Storage | null = null;
  token:string=null;
  private usuario:Usuario={};
  constructor(private http:HttpClient, 
    private storage:Storage,
    private navCtrl: NavController) { 

    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  //Obtener el token y alamacenarlo
 obtenerToken(email:string,password:string){
         // const data={Usuario:email, Clave:password};
         const body = new HttpParams()
    .set('Usuario', email)
    .set('Clave', password);
    //const headers = { 'content-type': 'application/json'}; 
          //Después vamos a definir la url base en una variable de environment.

        return new Promise(resolve=>{

          this.http.post('http://192.168.0.115:45455/api/propietarios/login',body,{'responseType':'text'})
        
           .subscribe( 
            resp=>{
              this.guardarToken(resp);
              resolve(true);

            }
          ,error=>{
            resolve(false);
            this.token=null;
            this._storage?.clear();
            console.log(error);

          });
         

        });
        
        

          

 }
 async guardarToken(token:string){
  
   this.token=token;
   await this._storage?.set('token', token);
 }

 async cargarToken(){
  this.token= await this.storage.get('token') ||null ;
}
 async obtenerUsuario():Promise<boolean>{

  await this.cargarToken();

  if (!this.token){
    this.navCtrl.navigateRoot('/login');
    return Promise.resolve(false);
  }
   return new Promise(resolve=>{

    const headers=new HttpHeaders({
      'authorization':'Bearer '+this.token
    });

    console.log(headers.get('x-token'));
    
    this.http.get('http://192.168.0.115:45455/api/propietarios',{headers})
      .subscribe(resp=>{

          resolve(true);
          this.usuario=resp;
          console.log(resp);
          console.log(this.usuario.idPropietario);

      },
      
      error=>{
        resolve(false);
        this.navCtrl.navigateRoot('/login');
        

      }
      )


   });
   
 }

 getUsuario(){
  if(!this.usuario.idPropietario){
    this.obtenerUsuario();
    
  }
  return {...this.usuario};
}

async actualizarPerfil(usuario:Usuario){

  
  await this.cargarToken();

  if (!this.token){
    this.navCtrl.navigateRoot('/login');
    return Promise.resolve(false);
  }
   return new Promise(resolve=>{

    const headers=new HttpHeaders({
      'authorization':'Bearer '+this.token
    });

    console.log(headers.get('x-token'));
    
    this.http.post('http://192.168.0.115:45455/api/propietarios',usuario,{headers})
      .subscribe(resp=>{

          resolve(true);
          this.usuario=resp;
          console.log(resp);
          console.log(this.usuario.idPropietario);

      },
      
      error=>{
        resolve(false);
        this.navCtrl.navigateRoot('/login');
        

      }
      )


   });
  
}
}
