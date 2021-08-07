import { Component } from '@angular/core';
import { Componente } from './interfaces/interfaces';
import { MenuController } from '@ionic/angular';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rutas:Observable<Componente[]>;
  constructor(private menuController:MenuController, private dataService:DataService) { }

  ngOnInit() {
    this.rutas=this.dataService.getMenuOpts();
    
  }
}
