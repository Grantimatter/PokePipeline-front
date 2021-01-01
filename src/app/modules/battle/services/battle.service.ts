import { Injectable } from '@angular/core';
import { Battle } from 'src/app/models/battle/battle';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private battle:Battle;

  constructor() { 
    
  }
}
