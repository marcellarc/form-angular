import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-formulario',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatDividerModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(150)]), // qtd de caracteres 
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]), // idade entre 0 e 120
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)])  // minimo 3 caracteres
  })

}
