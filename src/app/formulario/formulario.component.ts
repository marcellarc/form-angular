import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-formulario',
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatDividerModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]), // qtd de caracteres 
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(200)]),
    dataNascimento: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]), // formato 000.000.000-00
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]), // minimo 3 caracteres
    cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]),
  })

  validarEmail(): boolean {
    const email = this.formulario.get('email')?.value;
    if (!email) return false;
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padraoEmail.test(email);
  }

  validarCpf(): boolean {
    const cpf = this.formulario.get('cpf')?.value;
    if (!cpf) return false;

    const cpfSemMascara = cpf.replace(/\D/g, '');
    if (cpfSemMascara.length !== 11 || /^(\d)\1{10}$/.test(cpfSemMascara)) return false;

    //primeiro digito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfSemMascara.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpfSemMascara.charAt(9))) return false;

    //segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfSemMascara.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpfSemMascara.charAt(10))) return false;

    return true;
  }


  enviarFormulario() {
    const emailValido = this.validarEmail();
    const cpfValido = this.validarCpf();

    if (!emailValido) console.log('E-mail inválido.');

    if (!cpfValido) console.log('CPF inválido.');
    
    console.log('Formulário enviado com sucesso:', this.formulario.value);
  }
}

