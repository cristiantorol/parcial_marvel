import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PeticionService {
  public url: string;
  constructor(private _http:Http) {
      this.url="http://gateway.marvel.com/v1/public/comics?ts=1&apikey=b5dd158dd0e856443db7fb726fbc6bc9&hash=80182fcb24c6426319114b9e34eafed6&limit=100";

   }

   
   getInfo() {
        return this._http.get(this.url)
            .map(res => res.json());
    }

}
