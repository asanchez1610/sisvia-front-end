import { Component, OnInit , Input } from '@angular/core';


@Component({
  selector: 'app-header-sesion',
  templateUrl: './header-sesion.component.html',
  styleUrls: ['./header-sesion.component.css']
})
export class HeaderSesionComponent implements OnInit {

  @Input() title;  
  @Input() subTitle;

  relojTime : Date = new Date();

  constructor() { }

  ngOnInit() {
    setInterval(()=>{
      this.relojTime = new Date();
    }
    ,1000);    
  }


}
