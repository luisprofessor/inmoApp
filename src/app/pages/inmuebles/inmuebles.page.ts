import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Inmueble } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InmueblePage } from './inmueble/inmueble.page';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.page.html',
  styleUrls: ['./inmuebles.page.scss'],
})
export class InmueblesPage implements OnInit {

  inmuebles:Inmueble[]=[];
  
  constructor(private usuarioService: UsuarioService, private navCtrl: NavController,
    private modalCtrl:ModalController) { }

  ngOnInit() {
    //await this.usuarioService.cargarToken();
    this.usuarioService.obtenerInmuebles().subscribe(resp=>{
      console.log(resp[0].direccion);
      this.inmuebles.push(...resp);
    });
    

}
async onClick(inmueble:Inmueble) {
      console.log(inmueble);
     // this.navCtrl.navigateRoot('/inmuebles/inmueble');
     const modal= await this.modalCtrl.create({
      component: InmueblePage,
      componentProps:{
        inmueble
      }
    });

     modal.present();
}
}
