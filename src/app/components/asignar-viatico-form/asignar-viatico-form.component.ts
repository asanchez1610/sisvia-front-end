import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-asignar-viatico-form',
  templateUrl: './asignar-viatico-form.component.html',
  styleUrls: ['./asignar-viatico-form.component.css']
})
export class AsignarViaticoFormComponent implements OnInit {

  @ViewChild('alertResponse') private alertResponse: SwalComponent;

  loading = true;
  solicitud = null;
  isZonaCritica = true;
  titleSwal: String = '';
  msgSwal: String = '';
  typeSwal: String = '';
  showMas6Horas = false;
  isHoras = false;
  isPernocta = false;
  msgDias = '';
  totalMonto = '0.00';
  montoViatico = '0.00';
  montoMovilidad = '0.00';
  loadingMontos = false;
  montoCreditoTc = '--';
  estadoTc = '--';
  fechaRegistroTc = '--';
  numTc = '--';
  numCtaTc = '--';
  boxRegistrado = '';
  boxAutorizado = '';
  boxAsignado = '';

  textShadowRegistrado = '';
  textShadowAutorizado = '';
  textShadowAsignado = '';

  isAsignado = false;

  constructor(private apiService: ApiServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setSolicitud();
  }

  setSolicitud() {
    let id = +this.route.snapshot.paramMap.get('idsolicitud');
    this.apiService.obtenerSolicitudPorId(id)
      .subscribe(
        (data) => {
          this.loading = false;
          this.solicitud = data;
          this.marcarFlags(data);
          this.seleccionBoxEstado();
        },
        (error) => {
          this.loading = false;
          this.showDialog('Error', error.error.message, 'error');
        }
      );
  }

  seleccionBoxEstado() {
    if (this.solicitud) {

      if (this.solicitud['viatico'] && this.solicitud['viatico']['tarjetaCorporativa']) {
        let viatico = this.solicitud['viatico'];
        let tarjeta = this.solicitud['viatico']['tarjetaCorporativa'];
        let conceptos = this.solicitud['viatico']['conceptosAsignados'];
        this.isAsignado = true;
        if (conceptos) {
          conceptos.forEach(conceptoAsignado => {
            if (conceptoAsignado.conceptogastoId == 1) {
              this.montoViatico = conceptoAsignado.montogasto + '';
            } else if (conceptoAsignado.conceptogastoId == 2) {
              this.montoMovilidad = conceptoAsignado.montogasto + '';
            }
          });
        }
        this.totalMonto = viatico['montototal'] + '';

        this.montoCreditoTc = tarjeta['credito'];
        this.estadoTc = 'Asignado';
        this.fechaRegistroTc = tarjeta['fecregistro'];
        this.numTc = tarjeta['numtarjeta'];
        this.numCtaTc = tarjeta['numcuenta'];
        this.boxRegistrado = this.getTerminateBox();
        this.boxAutorizado = this.getTerminateBox();
        this.boxAsignado = this.getActiveBox();
        this.textShadowRegistrado = '';
        this.textShadowAutorizado = '';
        this.textShadowAsignado = this.getShadowText();
      } else if (this.solicitud['fecautoriza']) {
        this.boxRegistrado = this.getTerminateBox();
        this.boxAutorizado = this.getActiveBox();
        this.boxAsignado = this.getTerminateBox();
        this.textShadowRegistrado = '';
        this.textShadowAutorizado = this.getShadowText();
        this.textShadowAsignado = '';
      } else {
        this.boxRegistrado = this.getActiveBox();
        this.boxAutorizado = this.getTerminateBox();
        this.boxAsignado = this.getTerminateBox();
        this.textShadowRegistrado = this.getShadowText();
        this.textShadowAutorizado = '';
        this.textShadowAsignado = '';
      }

    } else {
      this.boxRegistrado = this.getActiveBox();
      this.boxAutorizado = this.getTerminateBox();
      this.boxAsignado = this.getTerminateBox();
      this.textShadowRegistrado = this.getShadowText();
      this.textShadowAutorizado = '';
      this.textShadowAsignado = '';
    }

  }

  marcarFlags(dataSolicitud) {
    this.isZonaCritica = (dataSolicitud['destino']['zonacritica'] == 1 ? true : false);
    if (dataSolicitud['duracion'] == 1) {
      this.msgDias = dataSolicitud['duracion'] + ' día';
      this.showMas6Horas = true;
      if (dataSolicitud['horas'] == 1) {
        this.isHoras = true;
        if (dataSolicitud['horas'] == 1) {
          this.isPernocta = true;
        }
      }
    } else {
      this.msgDias = dataSolicitud['duracion'] + ' días'
    }
  }

  showDialog(title, msg, type) {
    this.titleSwal = title;
    this.msgSwal = msg;
    this.typeSwal = type;
    setTimeout(() => {
      this.alertResponse.show();
    }, 100);
  }

  calcularMonto() {
    this.loadingMontos = true;
    this.apiService.calcularMonto()
      .subscribe(
        (data) => {
          this.loadingMontos = false;
          this.totalMonto = data['montos']['montoTotal'];
          this.montoMovilidad = data['montos']['montoMovilidad'];
          this.montoViatico = data['montos']['montoViatico'];
        },
        (error) => {
          this.loadingMontos = false;
          this.totalMonto = '';
          this.montoMovilidad = '';
          this.montoViatico = '';
          this.showDialog('Error', error.error.message, 'error');
        }
      );
  }

  generarTCAndRegistrarViatico() {

    if (parseFloat(this.totalMonto) == 0) {
      this.showDialog('Error', 'Por favor calcule el monto total de viaticos', 'error');
      return;
    }

    let empleado = this.solicitud['empleadoComisionado'];

    if (empleado.area &&
      empleado.area.centrocosto &&
      empleado.area.centrocosto.presupuesto &&
      empleado.area.centrocosto.presupuesto.presupuestoasignado) {
      let presupuestoDisponible = (empleado.area.centrocosto.presupuesto.presupuestoasignado - empleado.area.centrocosto.presupuesto.presupuestoejecutado)
          if (presupuestoDisponible < parseFloat(this.totalMonto)){
            this.showDialog('Error', 'El Área no cuenta con el presupuesto suficiente.', 'error');
            return;
        }
      
    }

    //solicitud.empleadoComisionado.area.centrocosto.presupuesto.presupuestoasignado

    let asignacion = {
      "solicitudviaticosId": this.solicitud['solicitudviaticosId'],
      "montoTotal": this.totalMonto,
      "montogastoMovilidad": this.montoMovilidad,
      "montogastoViatico": this.montoViatico
    };
    this.loading = true;
    this.apiService.asignarViatico(asignacion)
      .subscribe(
        (data) => {
          this.loading = false;
          let tarjeta = data['tarjeta'];
          this.montoCreditoTc = tarjeta['credito'];
          this.estadoTc = 'Asignado';
          this.fechaRegistroTc = tarjeta['fecregistro'];
          this.numTc = tarjeta['numtarjeta'];
          this.numCtaTc = tarjeta['numcuenta'];
          this.boxRegistrado = this.getTerminateBox();
          this.boxAutorizado = this.getTerminateBox();
          this.boxAsignado = this.getActiveBox();
          this.textShadowRegistrado = '';
          this.textShadowAutorizado = '';
          this.textShadowAsignado = this.getShadowText();
          this.isAsignado = true;
          this.showDialog('Exito', 'La Solicitud de viático N° ' + tarjeta['viatico']['viaticoId'] + ', se registró correctamente.', 'success');
        },
        (error) => {
          this.loading = false;
          if (error && error.error && error.error.message) {
            this.showDialog('Error', error.error.message, 'error');
          }
        }
      );

  }

  numberFormat(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat('0').toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}

  getTerminateBox() {
    return 'alert-light bg-gris-light-strong box-terminate panel-border-gris';
  }

  getActiveBox() {
    return 'alert-success';
  }

  getShadowText() {
    return 'text-sombreado';
  }

}
