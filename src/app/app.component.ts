import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'form-reativo';
}
