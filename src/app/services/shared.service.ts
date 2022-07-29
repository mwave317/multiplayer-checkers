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

  sendCheckers() {
    const checkers = [
      { squareId: '1-1', id: '1', class: 'square checkerboard-square-red', img: '' },
      { squareId: '1-2', id: '2', class: 'square checkerboard-square-black', img: ' ../../assets/images/red-checker-piece.svg' },
      { squareId: '1-3', id: '3', class: 'square checkerboard-square-red', img: '' },
      { squareId: '1-4', id: '4', class: 'square checkerboard-square-black', img: ' ../../assets/images/red-checker-piece.svg' },
      { squareId: '1-5', id: '5', class: 'square checkerboard-square-red', img: '' },
      { squareId: '1-6', id: '6', class: 'square checkerboard-square-black', img: ' ../../assets/images/red-checker-piece.svg' },
      { squareId: '1-7', id: '7', class: 'square checkerboard-square-red', img: '' },
      { squareId: '1-8', id: '8', class: 'square checkerboard-square-black', img: ' ../../assets/images/red-checker-piece.svg' },

      { squareId: '2-1', id: '9', class: 'square checkerboard-square-black', img: ' ../../assets/images/red-checker-piece.svg' },
      { squareId: '2-2', id: '10', class: 'square checkerboard-square-red', img: '' },
      { squareId: '2-3', id: '11', class: 'square checkerboard-square-black', img: ' ../../assets/images/red-checker-piece.svg' },
      { squareId: '2-4', id: '12', class: 'square checkerboard-square-red', img: '' },
      { squareId: '2-5', id: '13', class: 'square checkerboard-square-black', img: ' ../../assets/images/red-checker-piece.svg' },
      { squareId: '2-6', id: '14', class: 'square checkerboard-square-red', img: '' },
      { squareId: '2-7', id: '15', class: 'square checkerboard-square-black', img: '../../assets/images/red-checker-piece.svg' },
      { squareId: '2-8', id: '16', class: 'square checkerboard-square-red', img: '' },

      { squareId: '3-1', id: '17', class: 'square checkerboard-square-red', img: '' },
      { squareId: '3-2', id: '18', class: 'square checkerboard-square-black', img: '../../assets/images/red-checker-piece.svg' },
      { squareId: '3-3', id: '19', class: 'square checkerboard-square-red', img: '' },
      { squareId: '3-4', id: '20', class: 'square checkerboard-square-black', img: '../../assets/images/red-checker-piece.svg' },
      { squareId: '3-5', id: '21', class: 'square checkerboard-square-red', img: '' },
      { squareId: '3-6', id: '22', class: 'square checkerboard-square-black', img: '../../assets/images/red-checker-piece.svg' },
      { squareId: '3-7', id: '23', class: 'square checkerboard-square-red', img: '' },
      { squareId: '3-8', id: '24', class: 'square checkerboard-square-black', img: '../../assets/images/red-checker-piece.svg' },

      { squareId: '4-1', id: '25', class: 'square checkerboard-square-black', img: '' },
      { squareId: '4-2', id: '26', class: 'square checkerboard-square-red', img: '' },
      { squareId: '4-3', id: '27', class: 'square checkerboard-square-black', img: '' },
      { squareId: '4-4', id: '28', class: 'square checkerboard-square-red', img: '' },
      { squareId: '4-5', id: '29', class: 'square checkerboard-square-black', img: '' },
      { squareId: '4-6', id: '30', class: 'square checkerboard-square-red', img: '' },
      { squareId: '4-7', id: '31', class: 'square checkerboard-square-black', img: '' },
      { squareId: '4-8', id: '32', class: 'square checkerboard-square-red', img: '' },

      { squareId: '5-1', id: '33', class: 'square checkerboard-square-red', img: '' },
      { squareId: '5-2', id: '34', class: 'square checkerboard-square-black', img: '' },
      { squareId: '5-3', id: '35', class: 'square checkerboard-square-red', img: '' },
      { squareId: '5-4', id: '36', class: 'square checkerboard-square-black', img: '' },
      { squareId: '5-5', id: '37', class: 'square checkerboard-square-red', img: '' },
      { squareId: '5-6', id: '38', class: 'square checkerboard-square-black', img: '' },
      { squareId: '5-7', id: '39', class: 'square checkerboard-square-red', img: '' },
      { squareId: '5-8', id: '40', class: 'square checkerboard-square-black', img: '' },

      { squareId: '6-1', id: '41', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '6-2', id: '42', class: 'square checkerboard-square-red', img: '' },
      { squareId: '6-3', id: '43', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '6-4', id: '44', class: 'square checkerboard-square-red', img: '' },
      { squareId: '6-5', id: '45', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '6-6', id: '46', class: 'square checkerboard-square-red', img: '' },
      { squareId: '6-7', id: '47', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '6-8', id: '48', class: 'square checkerboard-square-red', img: '' },

      { squareId: '7-1', id: '49', class: 'square checkerboard-square-red', img: '' },
      { squareId: '7-2', id: '50', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '7-3', id: '51', class: 'square checkerboard-square-red', img: '' },
      { squareId: '7-4', id: '52', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '7-5', id: '53', class: 'square checkerboard-square-red', img: '' },
      { squareId: '7-6', id: '54', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '7-7', id: '55', class: 'square checkerboard-square-red', img: '' },
      { squareId: '7-8', id: '56', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },

      { squareId: '8-1', id: '57', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '8-2', id: '58', class: 'square checkerboard-square-red', img: '' },
      { squareId: '8-3', id: '59', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '8-4', id: '60', class: 'square checkerboard-square-red', img: '' },
      { squareId: '8-5', id: '61', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '8-6', id: '62', class: 'square checkerboard-square-red', img: '' },
      { squareId: '8-7', id: '63', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
      { squareId: '8-8', id: '64', class: 'square checkerboard-square-red', img: '' },
    ];

    return checkers;
  }
}


