import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-asignar-viatico',
  templateUrl: './asignar-viatico.component.html',
  styleUrls: ['./asignar-viatico.component.css']
})
export class AsignarViaticoComponent implements OnInit {

  loadingSolicitudes = false;
  ccostos = [];
  solicitudviaticosId = '';
  numDni = '';
  codCentroCosto = null;
  strFechaInicio = '';
  strFechaFin = '';
  nombreCompleto = '';

  data = [];
  
  constructor(
              private apiService: ApiServiceService
  ) { }

  ngOnInit() {
    this.loadSolicitudes();
    this.cargarCatalogos('ccostos');
  }

  setParameterListarSolicitudes(){
  
  //   solicitudviaticosId = '';
  // numDni = '';
  // codCentroCosto = '';
  // strFechaInicio = '';
  // strFechaFin = '';
  // nombreCompleto = '';

    let params = {};

    if(this.solicitudviaticosId){
      params['solicitudviaticosId'] =this.solicitudviaticosId;
    }

    if(this.numDni){
      params['numDni'] =this.numDni;
    }

    
    if(this.nombreCompleto){
      params['nombreCompleto'] =this.nombreCompleto;
    }

    if(this.codCentroCosto){
      params['codCentroCosto'] = this.codCentroCosto;
    }

    if(this.strFechaInicio){
      params['strFechaInicio'] = this.formatoFechaBusqueda(this.strFechaInicio);
    }

    if(this.strFechaFin){
      params['strFechaFin'] = this.formatoFechaBusqueda(this.strFechaFin);
    }

    return params;

  }

  formatoFechaBusqueda(dateData) {
    return dateData.year+ '-' + (dateData.month < 10 ? '0' + dateData.month : dateData.month) + '-'+(dateData.day < 10 ? '0' + dateData.day : dateData.day) ;
  }

  loadSolicitudes() {
    this.loadingSolicitudes = true;
    this.apiService.listarSolicitudes( this.setParameterListarSolicitudes())
      .subscribe(
        (response) => {
          this.loadingSolicitudes = false;
          this.data = response.data
        },
        (error) => {
          this.loadingSolicitudes = false;
          
        }
      );
  }

  cargarCatalogos(catalogoName) {
    this.apiService.listarCatalogos(catalogoName)
      .subscribe(
        (response) => {
          if (catalogoName == 'ccostos') {
            this.ccostos = response['data'];
          }
        }
      );
  }

  asignarViatico(event,item){
    alert(item.id);
  }

}
