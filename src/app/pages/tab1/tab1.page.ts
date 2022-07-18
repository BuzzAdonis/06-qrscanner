import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  swiopeOptions = {
    allowSlidePrev:false,
    allowSlideNext:false
  }
  ionViewDidEnter(){
   // console.log("ionViewDidEnter es cuando la pagina carga");
  }
  ionViewDidLeave(){
   // console.log("ionViewDidLeave es cuando la pagina sale de vista");
  }
  ionViewWillEnter(){
    //console.log("ionViewWillEnter va a cargar");
    this.scan();
  }
  ionViewWillLeave(){
   // console.log("ionViewWillLeave ya cargo");
  }
  constructor(private barcodeScanner:BarcodeScanner,
              private dataLocal:DataLocalService) {}
  scan(){
    
this.barcodeScanner.scan().then(barcodeData => {
  console.log('Barcode data', barcodeData);
  if(!barcodeData.cancelled){
    this.dataLocal.guardarRegistros(barcodeData.format,barcodeData.text);
  }
 }).catch(err => {
     console.log('Error', err);

     //this.dataLocal.guardarRegistros('QRCode', 'https://elpuerto.tv');
     this.dataLocal.guardarRegistros('QRCode', 'geo:40.73151796986687,-74.06087294062502');
 });
  }
}
