import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isNavbarCollapsed=false;
  
  @Input('title') title;
  @Output('changeTitle') changeTitle = new EventEmitter();
  @Input('subTitle') subTitle;
  @Output('changeSubTitle') changeSubTitle = new EventEmitter();

  constructor() {
    
   }

  ngOnInit() {
    if(window.location.pathname.indexOf('solicitar-viaticos') >= 0){
      this.seleccionPage('Solicitar viaticos',null);
    }else if(window.location.pathname.indexOf('asignar-viaticos') >= 0){
      this.seleccionPage('Asignar viaticos',null);
    }
  }

  seleccionPage(titulo,subTitulo){
    if(!titulo){
      titulo= 'Bienvenido!'
    }
    if(!subTitulo){
      subTitulo = 'Sistema de Administración de Viaticos.'; 
    }
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.changeTitle.emit(titulo);
    this.changeSubTitle.emit(subTitulo);
  }

}
