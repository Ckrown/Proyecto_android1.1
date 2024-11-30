import { Component, OnInit } from '@angular/core';
import { BarcodeFormat, Result } from '@zxing/library';  // Importar BarcodeFormat y Result desde @zxing/library

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';
  scanResult: string = '';  // Variable para almacenar el resultado del escáner
  isScanning: boolean = false;  // Controlar si el escáner está activo
  formats = [BarcodeFormat.QR_CODE];  // Configuración para escanear solo códigos QR

  constructor() {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
    console.log('Nombre de usuario en Inicio:', this.nombreUsuario);
  }

  // Método para manejar el resultado del escaneo
  onScanSuccess(result: any) {
    const scanResult = result as Result;  // Forzar el tipo a Result
    if (scanResult) {
      this.scanResult = scanResult.getText();  // Obtener el texto del código QR escaneado
      this.isScanning = false;
    }
  }
  

  // Método para iniciar el escáner
  startScanning() {
    this.isScanning = true;
  }
  
}
