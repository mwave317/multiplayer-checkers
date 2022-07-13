import { Component, OnInit } from '@angular/core';
import { CheckerboardService } from '../services/checkerboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  player1Active = false;
  player2Active = false;

  player1score: number = 0;
  player2score: number = 0;
  constructor(private checkerboardService: CheckerboardService) { }

  ngOnInit(): void {
    this.showActivePlayer();
  }

  showActivePlayer() {
    this.checkerboardService.sendActivePlayer().subscribe(data => {
      if (data == 'player1') {
        this.player1Active = !this.player1Active
      } else {
        this.player2Active = !this.player2Active
      }
    })
    // setTimeout(() => { this.endGame() }, 3000);
  }

  endGame() {
    this.checkerboardService.sendGameEnded().subscribe(data => {
      if (data) {
        this.player1Active = false;
        this.player2Active = false;
      }
    })
  }

}
