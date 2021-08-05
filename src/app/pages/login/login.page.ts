import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser={
    email:'mercado@mail.com',
    password:'123'
  };
  constructor(private userService:UsuarioService, 
    private navCtrl: NavController,
    private uiServiceService:UiServiceService) { }

  ngOnInit() {
  }

  async login(flogin:NgForm){
     if(flogin.invalid){
       return;
     }
      
      const valido= await this.userService.obtenerToken(this.loginUser.email,this.loginUser.password);
      if(valido){
        //Navegar al menú 
        this.navCtrl.navigateRoot('/menu',{animated:true});
      }else {
          //mostrar alerta
          this.uiServiceService.alertaInformativa("Usuario y/o Contraseña Incorrecta");
      }
  }

}
