import { Injectable } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Registro } from '../models/registro.model';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados:Registro[]=[];
  constructor(private storage:Storage,
              private navController:NavController,
              private inAppBrowser:InAppBrowser,
              private file:File,
              private emailComposer:EmailComposer
              ) { 
    this.cargarEscaneos();
  }
 async guardarRegistros(format:string, text:string){
    await this.cargarEscaneos();
    const nuevoRegistro = new Registro(format,text);
    this.guardados.unshift(nuevoRegistro);
    this.storage.set('registros', this.guardados);
    this.abrirRegistro(nuevoRegistro);
    console.log(this.guardados);
  }
async cargarEscaneos(){
this.guardados = (await this.storage.get('registros')) || [];
  }
  abrirRegistro(registro:Registro){
    this.navController.navigateForward('/tabs/tab2');
    switch(registro.type){
      case'http':
          this.inAppBrowser.create(registro.text,'_system')
      break
      case'geo':
      this.navController.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
      break
    }
  }
  enviarCorreo(){
    const arrTemp=[];
    const titulos ='Tipo, Formato, Creado en, Texto\n';
    arrTemp.push(titulos);
    this.guardados.forEach(registro =>{
      const filas =`${registro.type},${registro.format},${registro.created},${registro.text.replace(',','')}\n`;
      arrTemp.push(filas);
    });
    this.crearArchivoFisico(arrTemp.join(''));
  }
  crearArchivoFisico(text:string){
      this.file.checkFile(this.file.dataDirectory,'registro.csv')
        .then(exite =>{
          console.log('Exite Archivo',exite);
          return this.escribirEnElArchivo(text);
        })
        .catch(err => {
          return this.file.createFile(this.file.dataDirectory,'registro.csv',false)
          .then(creado => this.escribirEnElArchivo(text))
          .catch(err2=>console.error('No se puede crear el Archivo', err2));
        });
  }
 async escribirEnElArchivo(text:string){
    await this.file.writeExistingFile(this.file.dataDirectory,'registro.csv',text);
    const archivo =`${this.file.dataDirectory}registro.csv`;
    const email = {
      to: 'adonisalexander@hotmailcom',
     // cc: 'erika@mustermann.de',
     // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Backup de scan',
      body: 'Aquí tiene sus Backups de sus scans - <strong>ScanAPP</strong>',
      isHtml: true
    };
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
