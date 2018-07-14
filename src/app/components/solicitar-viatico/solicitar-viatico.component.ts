import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitar-viatico',
  templateUrl: './solicitar-viatico.component.html',
  styleUrls: ['./solicitar-viatico.component.css']
})
export class SolicitarViaticoComponent implements OnInit {

  @ViewChild('alertResponse') private alertResponse: SwalComponent;
  @Output() dateSelect = new EventEmitter<NgbDateStruct>();

  angularForm = new FormGroup({
    motivo: new FormControl()
  });

  panelBusquedaComisionado: Boolean = false;
  fechaInicio;
  fechaFin;
  loadingComisionado = false;
  loadingRegistro = false;
  txtDni: String = '';
  typeSwal: String = '';
  msgSwal: String = '';
  titleSwal: String = '';
  motivocomision: String = '';
  empleadoComisionado = {};
  destinos = [];
  tcomisiones = [];
  disabledZonaCritica = false;
  showMsgDias = false;
  msgDias = '';
  successDias = 'success';
  showMsg1Dia = false;
  isMasDe5 = false
  isMayor6Horas: Boolean = false;
  showPernocta = false;
  isPernocta = false;
  destinoValue = null;
  tComisionValue = null;
  solicitud = {};
  codCategoriaJefeRegional = 122;

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cargarCatalogos('destinos');
    this.cargarCatalogos('tcomisiones');
  }

  resetVariables() {
    this.panelBusquedaComisionado = false;
    this.fechaInicio = null;
    this.fechaFin = null;
    this.loadingComisionado = false;
    this.txtDni = '';
    this.typeSwal = '';
    this.msgSwal = '';
    this.titleSwal = '';
    this.empleadoComisionado = {};
    this.disabledZonaCritica = false;
    this.showMsgDias = false;
    this.msgDias = '';
    this.successDias = 'success';
    this.showMsg1Dia = false;
    this.isMayor6Horas = false;
    this.showPernocta = false;
    this.isPernocta = false;
    this.destinoValue = null;
    this.tComisionValue = null;
    this.solicitud = {};
    this.motivocomision = '';
    this.isMasDe5 = false;
  }

  createForm() {
    this.angularForm = this.fb.group({
      motivo: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      destinoCmb: [null, Validators.required],
      comisionesCmb: [null, Validators.required],
      dniBusquedaComisionado: ['', Validators.required]
    });
  }

  cargarCatalogos(catalogoName) {
    this.apiService.listarCatalogos(catalogoName)
      .subscribe(
        (response) => {
          if (catalogoName == 'destinos') {
            this.destinos = response['data'];
          } else if (catalogoName == 'tcomisiones') {
            this.tcomisiones = response['data'];
          }
        }
      );
  }

  buscarComisionado() {
    if (!this.txtDni) {
      this.empleadoComisionado = {};
      this.panelBusquedaComisionado = false;
      this.showDialog('Error', 'Ingrese el dni del empleado.', 'warning');
      return;
    }
    this.loadingComisionado = true;
    this.apiService.obtenerEmpleadoPorDni(this.txtDni)
      .subscribe(
        (empleado) => {
          this.empleadoComisionado = empleado;
          this.panelBusquedaComisionado = true;
          this.loadingComisionado = false;
        },
        (error) => {
          this.empleadoComisionado = {};
          this.panelBusquedaComisionado = false;
          this.loadingComisionado = false;
          if (error && error.error && error.error.message) {
            this.showDialog('Error', error.error.message, 'warning');
          }
        }
      );

  }

  seleccionarDestino($event) {
    if ($event && $event.zonacritica == 1) {
      this.disabledZonaCritica = true;
    } else {
      this.disabledZonaCritica = false;
    }
  }

  seleccionarFechas($event) {
    this.showMsgDias = false;
    this.showMsg1Dia = false;
    this.isMasDe5 = false;
    this.showPernocta = false;
    if (this.fechaInicio && this.fechaFin) {
      let diasDif = this.diferenciasDias(this.fechaFin, this.fechaInicio);
      if (diasDif > 5) {
        this.showMsgDias = true;
        this.msgDias = diasDif + (diasDif == 1 ? ' día' : ' días');
        this.successDias = 'primary';
        this.isMasDe5 = true;
        //this.showDialog('Advertencia', 'Los viáticos a partir del sexto día cubren solo 60% de gastos', 'warning');
      } else if (diasDif > 0 && diasDif <= 5) {
        this.showMsgDias = true;
        this.msgDias = diasDif + (diasDif == 1 ? ' día' : ' días');
        this.successDias = 'success';
        if (diasDif == 1) {
          this.showMsg1Dia = true;
        }
      } else {
        this.showMsgDias = false;
        this.msgDias = '';
        this.showDialog('Error', 'Fechas incorrectas, por favor, elija otras fechas', 'error');
      }
    }
  }

  diferenciasDias(dateInicio, dateFin) {
    let a = moment([dateInicio.year, (dateInicio.month - 1), dateInicio.day]);
    let b = moment([dateFin.year, (dateFin.month - 1), dateFin.day]);
    let dif = a.diff(b, 'days');
    return (dif == 0 ? 1 : dif);
  }

  showDialog(title, msg, type) {
    this.titleSwal = title;
    this.msgSwal = msg;
    this.typeSwal = type;
    setTimeout(() => {
      this.alertResponse.show();
    }, 100);
  }

  validarMayor6Horas($event) {
    this.isMayor6Horas = document.getElementById('chkMayor6Horas')['checked'];
    if (this.isMayor6Horas) {
      this.showPernocta = true;
      this.isPernocta = true;
    } else {
      this.showPernocta = false;
      this.isPernocta = false;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  cancelar() {
    this.clearAllFormFields(this.angularForm);
    this.resetVariables();
  }

  clearAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.reset();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  validarComisionado() {
    if (!this.empleadoComisionado || !this.empleadoComisionado['empleadoId']) {
      this.showDialog('Error', 'Comisionado no informado.', 'error');
      return false;
    }

    let diferenciaDias = this.diferenciasDias(this.fechaFin, this.fechaInicio);

    if (this.empleadoComisionado['categoria'] &&
      this.empleadoComisionado['categoria']['codcategoria'] != this.codCategoriaJefeRegional &&
      diferenciaDias == 1 &&
      this.isMayor6Horas &&
      !this.isPernocta) {
      this.showDialog('Error', 'Debe marcar la opción Pernocta.', 'error');
      return false;
    }

    if (diferenciaDias < 0) {
      this.showDialog('Error', 'Fechas incorrectas, por favor, elija otras fechas', 'error');
    }


    return true;
  }

  setPernocta() {
    this.isPernocta = document.getElementById('chkPernocta')['checked'];
  }

  cargarDatosSolicitid() {

    let diasDif = this.diferenciasDias(this.fechaFin, this.fechaInicio);
    this.solicitud['duracion'] = diasDif;
    this.solicitud['horas'] = (this.isMayor6Horas ? 1 : 0);
    this.solicitud['motivocomision'] = this.motivocomision;
    this.solicitud['pernocta'] = (this.isPernocta ? 1 : 0);
    this.solicitud['destino'] = {};
    this.solicitud['destino']['destinoId'] = this.destinoValue;
    this.solicitud['empleadoComisionado'] = {};
    this.solicitud['empleadoComisionado']['empleadoId'] = this.empleadoComisionado['empleadoId'];
    this.solicitud['empleadoSolicita'] = {};
    this.solicitud['empleadoSolicita']['empleadoId'] = this.empleadoComisionado['empleadoId'];
    this.solicitud['tipocomision'] = {};
    this.solicitud['tipocomision']['tipocomisionId'] = this.tComisionValue;
    this.solicitud['strFechaInicio'] = this.formatoFechaRegistro(this.fechaInicio);
    this.solicitud['strFechaFin'] = this.formatoFechaRegistro(this.fechaFin);

  }

  formatoFechaRegistro(dateData) {
    return (dateData.day < 10 ? '0' + dateData.day : dateData.day) + '/' + (dateData.month < 10 ? '0' + dateData.month : dateData.month) + '/' + dateData.year;
  }

  registrarSolicitud() {
    this.validateAllFormFields(this.angularForm);
    if (!this.angularForm.invalid) {
      if (this.validarComisionado()) {
        this.loadingRegistro = true;
        this.cargarDatosSolicitid();
        this.apiService.registrarSolicitud(this.solicitud)
          .subscribe(
            (data) => {
              this.loadingRegistro = false;
              this.cancelar();
              this.showDialog('Exito', 'La Solicitud de viático N° ' + data.solicitudviaticosId + ', se registró correctamente.', 'success');
            },
            (error) => {
              this.loadingRegistro = false;
              if (error && error.error && error.error.message) {
                this.showDialog('Error', error.error.message, 'error');
              }
            }
          );
      }
    }
  }



}
