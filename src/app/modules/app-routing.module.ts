import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarViaticoComponent } from '../components/solicitar-viatico/solicitar-viatico.component';
import { AsignarViaticoComponent } from '../components/asignar-viatico/asignar-viatico.component';
import { RendirGastosComponent } from '../components/rendir-gastos/rendir-gastos.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { AsignarViaticoFormComponent } from '../components/asignar-viatico-form/asignar-viatico-form.component';

const routes: Routes = [
  { path: '', component: InicioComponent  },
  { path: 'solicitar-viaticos', component: SolicitarViaticoComponent },
  { path: 'asignar-viaticos', component: AsignarViaticoComponent },
  { path: 'rendir-gastos', component: RendirGastosComponent },
  { path: 'asignar-viaticos/:idsolicitud', component: AsignarViaticoFormComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
