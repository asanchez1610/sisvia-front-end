import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { SolicitarViaticoComponent } from '../components/solicitar-viatico/solicitar-viatico.component';
import { AsignarViaticoComponent } from '../components/asignar-viatico/asignar-viatico.component';
import { RendirGastosComponent } from '../components/rendir-gastos/rendir-gastos.component';
import { HeaderSesionComponent } from '../components/header-sesion/header-sesion.component';
import { AsignarViaticoFormComponent } from '../components/asignar-viatico-form/asignar-viatico-form.component';
import { AppRoutingModule } from '../modules/app-routing.module';
import { MomentModule } from 'ngx-moment';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';
import { DataTableModule } from "angular-6-datatable";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SolicitarViaticoComponent,
    AsignarViaticoComponent,
    RendirGastosComponent,
    HeaderSesionComponent,
    InicioComponent,
    AsignarViaticoFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    MomentModule,
    SweetAlert2Module.forRoot(),
    NgSelectModule, 
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    DataTableModule,
    HttpClientModule
  ],
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
