import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  player1Active = new Subject<boolean>();
  player2Active = new Subject<boolean>();
  startGame = new Subject<boolean>();
  endGame = new Subject<boolean>();

  constructor() { }

  sendStartGame(): Observable<boolean> {
    return this.startGame.asObservable();
  }

  sendEndGame(): Observable<boolean> {
    return this.endGame.asObservable();
  }
}


