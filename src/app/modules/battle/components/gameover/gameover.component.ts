import { Component, OnInit } from '@angular/core';
import { PartyService } from 'src/app/modules/trainer-hub/services/party/party.service';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {

  public battlesWon:number;
  public exp:number;
  
  constructor(private partyService:PartyService) { 
    this.battlesWon = this.partyService.getBattleCount();
    this.exp = this.battlesWon * 100;
  }

  ngOnInit(): void {
  }

}
