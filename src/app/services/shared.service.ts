import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  player1Active = new Subject<boolean>();
  player2Active = new Subject<boolean>();
  startGame = new Subject<boolean>();

  constructor() { }


  // whichPlayerIsActive(player) {
  //   if (player === 'player1') {
  //     this.player1Active.next('player1');
  //   }
  //   else {
  //     this.player2Active.next('player2');
  //   }
  // }

  sendStartGame(): Observable<boolean> {
    return this.startGame.asObservable();
  }

  sendActivePlayer(): Observable<any> {
    return
    // if (this.player1Active) {
    //   return this.player1Active.asObservable();
    // } else {
    //   return this.player2Active.asObservable();
    // }
  }

  // hasGameEnded(): Observable<string> {
  //   return this.endGameNow.asObservable();
  // }

  // sendGameEnded(status) {
  //   this.endGameNow.next(status);
  // }
}


