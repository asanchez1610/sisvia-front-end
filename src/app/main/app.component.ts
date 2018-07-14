import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido!';
  subTitle = 'Sistema de Administración de Viaticos.';

  updateTitle(titulo) {
    this.title = titulo;
  }

  updateSubTitle(subtitulo) {
    this.subTitle = subtitulo;
  }

}