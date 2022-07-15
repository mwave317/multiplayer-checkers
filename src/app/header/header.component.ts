import { Component, OnInit, Input } from '@angular/core';
import { CheckerboardService } from '../services/checkerboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() player1Active = false;
  @Input() player2Active = false;
  @Input() endGame: any;
  player1score: number = 0;
  player2score: number = 0;
  constructor(private checkerboardService: CheckerboardService) { }

  ngOnInit(): void {
    this.showActivePlayer();

  }

  showActivePlayer() {
    this.checkerboardService.sendActivePlayer().subscribe(data => {
      if (data == 'player1') {
        this.player1Active = true;
        this.player2Active = false;
      } else {
        this.player1Active = false;
        this.player2Active = true;
      }
    })
    // setTimeout(() => { this.endGame() }, 3000);
  }

  onEndGame(value) {
    this.checkerboardService.sendGameEnded().subscribe(data => {
      if (value) {
        this.player1Active = false;
        this.player2Active = false;
      }
    })
  }

}
