import { Component, OnInit } from '@angular/core';
import { BarcodeFormat, Result } from '@zxing/library';  

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';
  scanResult: string = '';  
  isScanning: boolean = false;  
  formats = [BarcodeFormat.QR_CODE];  

  constructor() {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
    console.log('Nombre de usuario en Inicio:', this.nombreUsuario);
  }

 
  onScanSuccess(result: any) {
    const scanResult = result as Result; 
    if (scanResult) {
      this.scanResult = scanResult.getText();  
      this.isScanning = false;
    }
  }
  


  startScanning() {
    this.isScanning = true;
  }
  
}
