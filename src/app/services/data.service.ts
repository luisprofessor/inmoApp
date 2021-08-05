import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpCliente:HttpClient) { }

  getMenuOpts(){
    return this.httpCliente.get<Componente[]>('/assets/data/menu-opts.json');
  }
}
