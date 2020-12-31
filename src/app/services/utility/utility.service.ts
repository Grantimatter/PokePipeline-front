import { Injectable } from '@angular/core';

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
}
