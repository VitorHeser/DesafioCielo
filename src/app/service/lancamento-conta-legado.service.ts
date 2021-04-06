import { Injectable } from '@angular/core';

import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable ()
export class LancamentoContaLegadoService {

  constructor(private http: HttpClient){}

  GetLancamentos(): Observable<any[]>{
     return  this.http.get(`${API_CONFIG}/posts`) 
     .pipe(map((res : any[]) => res, catchError(ErrorHandler.handleError)))
  }
}
