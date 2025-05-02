import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { viaCepResults } from '../_models/viacep.results';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  validarCep(cep: string) {
    const cepLimpo = cep.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

    return this.http.get<viaCepResults>(url).pipe(
      map(response => {
        return response;
      })
    )
  }
}
