import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

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
    console.log("ionViewDidEnter es cuando la pagina carga");
  }
  ionViewDidLeave(){
    console.log("ionViewDidLeave es cuando la pagina sale de vista");
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter va a cargar");
    this.scan();
  }
  ionViewWillLeave(){
    console.log("ionViewWillLeave ya cargo");
  }
  constructor(private barcodeScanner:BarcodeScanner) {}
  scan(){
    
this.barcodeScanner.scan().then(barcodeData => {
  console.log('Barcode data', barcodeData);
 }).catch(err => {
     console.log('Error', err);
 });
  }
}
