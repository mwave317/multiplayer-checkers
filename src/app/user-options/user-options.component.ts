import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit {
  disabled: boolean = false;
  player1Active: boolean = false;
  player2Active: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  onStartGame() {
    // this.disabled = true;
    this.player1Active = !this.player1Active;
    this.sharedService.player1Active.next(this.player1Active);
  }

  onStopGame() {
    this.disabled = false;
    this.player1Active = false;
    this.player2Active = false;
    this.sharedService.player1Active.next(this.player1Active);
    this.sharedService.player2Active.next(this.player1Active);
  }
}
