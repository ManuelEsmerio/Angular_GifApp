import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent{

  constructor(private gifsService:GifsService){}

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar():void{
    let query = this.txtBuscar.nativeElement.value;
    if (query.trim().length === 0) {return;}
    
      this.gifsService.buscarGifs(query);
      this.txtBuscar.nativeElement.value = '';
  }
}
