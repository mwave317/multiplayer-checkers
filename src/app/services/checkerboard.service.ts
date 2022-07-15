import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckerboardService {
  player1Active = new Subject<string>();
  player2Active = new Subject<string>();
  endGameNow = new Subject<boolean>();

  constructor() { }


  whichPlayerIsActive(player) {
    if (player === 'player1') {
      this.player1Active.next('player1');
    }
    else {
      this.player2Active.next('player2');
    }
  }

  sendActivePlayer(): Observable<any> {
    if (this.player1Active) {
      return this.player1Active.asObservable();
    } else {
      return this.player2Active.asObservable();
    }
  }

  hasGameEnded(status) {
    this.endGameNow.next(status);
  }

  sendGameEnded(): Observable<boolean> {
    return this.endGameNow.asObservable();
  }
}


