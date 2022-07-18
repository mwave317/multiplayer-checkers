import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';

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
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.player1Active.subscribe(data => { this.player1Active = data });
  }

  showActivePlayer() {
    // this.sharedService.sendActivePlayer().subscribe(data => {
    //   if (data == 'player1') {
    //     this.player1Active = true;
    //     this.player2Active = false;
    //   } else {
    //     this.player1Active = false;
    //     this.player2Active = true;
    //   }
    // })
  }

  onEndGame() {
    this.sharedService.hasGameEnded().subscribe(data => {
      if (data === 'gameEnded') {
        this.player1Active = false;
        this.player2Active = false;
      }
    })
  }

}
