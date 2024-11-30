import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiControllerService {
  apiURL: string;

  constructor(private http: HttpClient) {
    // Obtener el hostname de la URL actual
    const hostname = window.location.hostname;

    // Si está corriendo en localhost o en una red local (como 192.168), usa la IP de la máquina.
    if (hostname === 'localhost' || hostname.startsWith('192.168')) {
      this.apiURL = '192.168.18.75';  // Sustituye esto por la IP de tu PC.
    } else if (hostname === '10.0.2.2') {
      // 10.0.2.2 es la IP de localhost cuando se ejecuta en un emulador de Android.
      this.apiURL = 'http://10.0.2.2:3000/';
    } else {
      // Por defecto, usa localhost (para navegador, si se ejecuta con ionic serve)
      this.apiURL = 'http://localhost:3000/';
    }
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.apiURL + 'usuarios');
  }

  insertarUsuarios(data: any): Observable<any> {
    return this.http.post(this.apiURL + 'usuarios/', data);
  }

  borrarUsuario(id: any): Observable<any> {
    return this.http.delete(this.apiURL + 'usuarios/' + id);
  }

  modificarUsuario(id: any, data: any): Observable<any> {
    return this.http.put(this.apiURL + 'usuarios/' + id, data);
  }
}
