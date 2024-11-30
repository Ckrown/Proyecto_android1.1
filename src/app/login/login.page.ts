import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ApiControllerService } from '../servicios/api-controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  isLoading: boolean = false;
  usuarios:any[]=[]
  user={
    "nombre":"",
    "contrasena":""
  }

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private loadingController: LoadingController,
    private api:ApiControllerService
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {

    this.api.insertarUsuarios(this.user).subscribe(
      (data)=>{
        console.log("usuario guardado")
      },
      (error)=>{
        console.log("error")
      }
    )

    this.api.obtenerUsuarios().subscribe(
      (data)=>{
        this.usuarios=data
        console.log("los usuarios son: ",this.usuarios)
      },
      (error)=>{
        console.log("error")
      }
    )

   }

   async ingresar() {
    const f = this.formularioLogin.value;
  
    if (!f.nombre || !f.password) {
      const alert = await this.alertController.create({
        message: 'Por favor, complete todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();
  
    this.api.obtenerUsuarios().subscribe(
      async (usuarios) => {
        this.usuarios = usuarios;
        console.log("Usuarios obtenidos: ", this.usuarios);  // Para verificar que obtienes los usuarios
  
        const usuarioValido = this.usuarios.find(
          (user) => user.nombre === f.nombre && user.contrasena === f.password
        );
  
        await loading.dismiss();
  
        if (usuarioValido) {
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('nombreUsuario', usuarioValido.nombre);
  
          const successAlert = await this.alertController.create({
            message: `¡Bienvenido, ${usuarioValido.nombre}!`,
            buttons: ['Aceptar'],
          });
          await successAlert.present();
  
          this.navCtrl.navigateRoot('inicio');
        } else {
          const alert = await this.alertController.create({
            message: 'Nombre de usuario o contraseña incorrectos.',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      },
      async (error) => {
        await loading.dismiss();
        console.error('Error al obtener usuarios:', error);
  
        const alert = await this.alertController.create({
          message: 'Hubo un error al conectarse al servidor. Inténtelo más tarde.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    );
  }
  
}