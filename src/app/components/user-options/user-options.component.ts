import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CheckerboardComponent } from '../checkerboard/checkerboard.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit {
  @ViewChild(CheckerboardComponent, { static: true }) child: CheckerboardComponent;
  disabled: boolean = false;
  player1Active: boolean = true;
  player2Active: boolean = false;
  startGame: boolean = true;
  endGame: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

  }

  onStartGame() {
    this.disabled = true;
    this.player1Active = true;
    this.startGame = true;
    this.sharedService.player1Active.next(this.player1Active);
    this.sharedService.startGame.next(this.startGame)
  }

  onStopGame() {
    this.disabled = false;
    this.player1Active = false;
    this.player2Active = false;
    this.sharedService.player1Active.next(this.player1Active);
    this.sharedService.player2Active.next(this.player2Active);
    this.sharedService.endGame.next(this.endGame);
  }
}
