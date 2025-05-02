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
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CepService } from '../services/cep.service';

@Component({
  selector: 'app-formulario',
  providers: [provideNgxMask()],
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatDividerModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern(/^[a-zA-Z\s]+$/)]), // qtd de caracteres 
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(200)]),
    dataNascimento: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,2}\/\d{1,2}\/\d{4}$/)]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]), // formato 000.000.000-00
    cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]),
    cidade: new FormControl({value: '', disabled: true}, [Validators.required]),
    estado: new FormControl({value: '', disabled: true}, [Validators.required]),
    bairro: new FormControl({value: '', disabled: true}, [Validators.required]),
    logradouro: new FormControl({value: '', disabled: true}, [Validators.required]),
  })

  constructor(private cepService: CepService) {}

  observePreenchimentoCep(){
    this.formulario.get('cep')?.valueChanges.subscribe(value => {
      this.buscarCep();
    })
  }

  buscarCep(){
    const cep = this.formulario.get('cep')?.value;
    if(!cep) return;

    this.cepService.validarCep(cep).subscribe({
      next: (response) => {
        this.formulario.patchValue({
          logradouro: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.uf,
        })
      },

      error: () => {
        console.log("erro ao buscar CEP");
      }
    })
  }

  ngOnInit(): void{
    this.observePreenchimentoCep();
  }

  validarNome(): boolean {
    const nome = this.formulario.get('nome')?.value;
    if (!nome || nome.length > 150) return false;
    const padraoNome = /^[a-zA-Z\s]+$/;
    return padraoNome.test(nome);
  }

  validarEmail(): boolean {
    const email = this.formulario.get('email')?.value;
    if (!email || email.length > 200) return false;
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
    const nomeValido = this.validarNome();

    if (!emailValido) console.log('E-mail inválido.');

    if (!cpfValido) console.log('CPF inválido.');

    if (!nomeValido) console.log('Nome inválido.');
    
    console.log('Formulário enviado com sucesso:', this.formulario.value);
  }
}

