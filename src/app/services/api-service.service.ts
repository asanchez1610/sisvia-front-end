import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:8082/sisvia-provider/api/';

  constructor(private http: HttpClient) { }

  obtenerEmpleadoPorDni(dni): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + 'empleado/' + dni);
  }

  listarCatalogos(catalogoName): Observable<Object> {
    return this.http.get<any>(this.apiUrl + 'catalogos/' + catalogoName);
  }

  registrarSolicitud(solicitud): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'viatico/solicitud', solicitud, httpOptions)
  }

  listarSolicitudes(solicitud): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'viatico/solicitudes', solicitud, httpOptions)
  }

  obtenerSolicitudPorId(id): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + 'viatico/solicitudes/' + id);
  }

  calcularMonto(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + 'viatico/calcularMonto');
  }

  asignarViatico(asignacion): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'viatico/asignacion', asignacion, httpOptions)
  }

}
