import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;
  validationMessages = {
    nombres: [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'minLength', message: 'Mínimo 2 caracteres' }
    ],
    apellidos: [
      { type: 'required', message: 'El apellido es requerido' },
      { type: 'minLength', message: 'Mínimo 2 caracteres' }
    ],
    email: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'ojo! este no es un email válido' }
    ],
    password: [
      { type: 'required', message: 'El password es requerido' },
      { type: 'minLength', message: 'Mínimo 5 caracteres para el password' }
    ]
  };
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthenticateService,
              private navCtrl: NavController, private storage: Storage) {
    this.registerForm = this.formBuilder.group({
      nombres: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  registerUser(userData) {
    this.authService.registerUser(userData).then(() => {
      this.navCtrl.navigateBack('/login');
    });
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

}
