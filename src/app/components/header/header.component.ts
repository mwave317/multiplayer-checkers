import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AppComponent]
})
export class HeaderComponent implements OnInit {
  player1Active: boolean = false;
  player2Active: boolean = false;
  @Input() endGame: any;
  player1score: number = 0;
  player2score: number = 0;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.player1Active.subscribe(data => { this.player1Active = data });
    console.log('this.player1Active', this.player1Active);

  }

  // showActivePlayer() {
  // }



  onEndGame() {
    console.log('I am clicked!');

    // this.showActivePlayer();
    // if (status === 'gameEnded') {
    // this.player1Active = false;
    // this.player2Active = false;
    // }
    // this.sharedService.hasGameEnded().subscribe(data => {
    //   console.log('data', data);
    //   if (data === 'none') {
    //     this.player1Active = false;
    //     this.player2Active = false;
    //   }
    // })

    // setTimeout(() => { console.log('this.player1Active', this.player1Active, 'this.player2Active', this.player2Active) }, 9000);
  }

}
