import { Injectable } from '@angular/core';
import { Type } from 'src/app/models/enums/type.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /**
   * @returns returns a random number in the given range
   * @param min - The smallest number to be included
   * @param max - The largest number to be included
   */
  getRandomInt(min:number, max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Get the appropriate color of the Type.
   * @returns returns a hexadecimal color in a string.
   * @param type Type enum.
   */
  getTypeColor(type:Type):string {
    switch(type) {
      case 'BUG': return "#a8b820";
      case 'DARK': return "#705848";
      case 'DRAGON': return "#7038f8";
      case 'ELECTRIC': return "#f8d030";
      case 'FAIRY': return "#fb8aec";
      case 'FIGHTING': return "#c03028";
      case 'FIRE': return "#f08030";
      case 'FLYING': return "#a890f0";
      case 'GHOST': return "#705898";
      case 'GRASS': return "#78c850";
      case 'GROUND': return "#e0c068";
      case 'ICE': return "#98d8d8";
      case 'NORMAL': return "#a8a878";
      case 'POISON': return "#a040a0";
      case 'PSYCHIC': return "#f85888";
      case 'ROCK': return "#b8a038";
      case 'STEEL': return "#b8b8d0";
      case 'WATER': return "#6890f0";
      default: return "#fff";
    }
  }

  // toUppercase(text:string):string {
  //   return text.toUpperCase();
  // }

}
