import { Component } from '@angular/core';
import { Registro } from '../../models/registro.model';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal:DataLocalService) {
  }
  enviarCorreos(){
    this.dataLocal.enviarCorreo();
  }
  abrirRegistro(registro:Registro){
    this.dataLocal.abrirRegistro(registro);
  }
}
