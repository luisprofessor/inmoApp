import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Inmueble } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.page.html',
  styleUrls: ['./inmueble.page.scss'],
})
export class InmueblePage implements OnInit {

  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  regresar(){
    this.modalCtrl.dismiss();
  }

}
