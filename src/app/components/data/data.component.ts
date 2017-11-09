import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

	forma: FormGroup;

	usuario: any = {
		nombreCompleto: {
			nombre: 'Jair',
			apellido: 'Suárez'
		},
		correo: 'jjsuarez8@hotmail.es'
		// pasatiempos: ['Correr', 'Dormir', 'Comer']
	}

  constructor() { 
  	console.log(this.usuario);
  	this.forma = new FormGroup({
  		'nombreCompleto': new FormGroup({
  			'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
  			'apellido': new FormControl('', [Validators.required, this.noHerrera])
  		}),
  		'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
  		'pasatiempos': new FormArray([
  			new FormControl('Correr', Validators.required)
  		]),
  		'user': new FormControl('', Validators.required, this.existeUsuario),
  		'pass1': new FormControl('', Validators.required),
  		'pass2': new FormControl()
  	});

  	// this.forma.setValue(this.usuario);

  	this.forma.controls['pass2'].setValidators([
  		Validators.required, this.noIgual.bind(this.forma)
  	]);

  	this.forma.controls['user'].valueChanges.subscribe(data => {
  		console.log(data);
  	});

  	this.forma.controls['user'].statusChanges.subscribe(data => {
  		console.log(data);
  	});

  }

  agregarPasatiempo(){
  	(<FormArray>this.forma.controls['pasatiempos']).push(
  		new FormControl('', Validators.required)
  	);
  }

  noHerrera(control: FormControl): {[s:string]: boolean} {
		if(control.value == 'herrera'){
			return {noherrera: true}
		}
  	return null;
  }

  noIgual(control: FormControl): {[s:string]: boolean} {
  	let forma:any = this;
		if(control.value != forma.controls['pass1'].value){
			return {noigual: true}
		}
  	return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any>{
  	let promesa = new Promise((resolve, reject) => {
  		setTimeout(()=>{
  			if(control.value == 'JEIK08'){
  				resolve({existe: true});
  			}else{
  				resolve(null);
  			}
  		}, 3000)
  	});
  	return promesa;
  }

  guardarCambios(){
  	console.log(this.forma);
  	console.log(this.forma.value);
  	// this.forma.reset({
  	// 	nombreCompleto: {
  	// 		nombre: '',
  	// 		apellido: ''
  	// 	},
  	// 	correo: ''
  	// })
  }

}
