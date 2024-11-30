import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importar el módulo del escáner

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ZXingScannerModule // Asegúrate de importar aquí el módulo del escáner
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
