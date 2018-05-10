import { Component, OnInit } from '@angular/core';
import {PeticionService} from '../services/peticion.service';
import {ComicElement} from '../comic/comic-element';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
  providers:[PeticionService]
})
export class ComicComponent implements OnInit {

  public IMG_NOT_AV = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  public _comics:Array<ComicElement> = [];
  constructor(
    private _peticionService: PeticionService
  ) { }

  public likes(index,ok){
    if(ok){
      this._comics[index].likes+=1;
      console.log(this._comics[index]);
    }else if(this._comics[index].likes!=0){
      this._comics[index].likes-=1;
    }

  }

  ngOnInit() {
    this._peticionService.getInfo().subscribe(
      result =>{
        console.log(result.data.results);
        for(var item in result.data.results){
          var date = result.data.results[item].dates[1].date.split("T",1);
          var img = result.data.results[item].thumbnail.path;
          if(date[0]!="-0001-11-30" && img!=this.IMG_NOT_AV){
            this._comics.push(
              new ComicElement(result.data.results[item].title,img+"/standard_amazing.jpg",date[0],0)
              )
          }
        }
        console.log(this._comics);
      },
      error => {
        var errorMsj = <any>error;
        console.log(errorMsj);
      }
    )
  }

}
