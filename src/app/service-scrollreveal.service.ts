import { Injectable } from '@angular/core';
import { NgsRevealConfig } from 'ngx-scrollreveal';


@Injectable({
  providedIn: 'root'
})
export class ServiceScrollrevealService {

  config1reveal: NgsRevealConfig;

  constructor(config:NgsRevealConfig){

    this.config1reveal = {reset:true};
    this.config1reveal = {origin:"bottom"}
    this.config1reveal = {distance:"20px"}
    this.config1reveal = {duration: 600}
    this.config1reveal = {easing: "ease-out"}
    this.config1reveal = {scale: 1}
    this.config1reveal = {viewFactor: 0}
    this.config1reveal = {mobile: false}
    


  
    
  }

}
