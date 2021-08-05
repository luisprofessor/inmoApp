import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  constructor(private userService:UsuarioService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async login(flogin:NgForm){
     if(flogin.invalid){
       return;
     }
      
      const valido= await this.userService.obtenerToken(this.loginUser.email,this.loginUser.password);
      if(valido){
        //Navegar al menú 
        this.navCtrl.navigateRoot('/main/menu',{animated:true});
      }else {
          //mostrar alerta
          
      }
  }

}
