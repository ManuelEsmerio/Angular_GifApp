import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html'
})
export class ResultadosComponent{

  constructor(private gifsService: GifsService){}

  get resultado(): Gif[] {
    return this.gifsService.resultados;
  }

}
