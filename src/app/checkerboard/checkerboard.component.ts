import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CheckerboardService } from '../services/checkerboard.service';

@Component({
  selector: 'app-checkerboard',
  templateUrl: './checkerboard.component.html',
  styleUrls: ['./checkerboard.component.css']
})
export class CheckerboardComponent implements OnInit {
  disabled: boolean = false;
  player1Active: boolean = true;
  player2Active: boolean = false;
  newGame: boolean = false;
  @Output() endGame: EventEmitter<boolean>;
  // items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  positions: any[];
  items: Array<any> = [
    // ../../assets/images/${this.checkers[i].color}-checker-piece.svg
    // ../../assets/images/gray-checker-piece.svg
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },

    { class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },

    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },

    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },

    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },

    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },

    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },

    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
    { class: 'square checkerboard-square-black', img: '' },
    { class: 'square checkerboard-square-red', img: '' },
  ];

  constructor(private checkerBoardService: CheckerboardService) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any>) {
    this.items[event.previousContainer.data.index] = event.container.data.item
    this.items[event.container.data.index] = event.previousContainer.data.item
    event.currentIndex = 0;
    console.log(event.previousContainer.data, '-->', event.container.data)
  }


  addPieces() {
    this.newGame = true;
    this.disabled = true;
    this.onActivePlayer('player1');
    this.onEndGame(false);
  }

  onActivePlayer(player) {
    this.checkerBoardService.whichPlayerIsActive(player);
  }
  stopGame() {
    this.newGame = false;
    this.disabled = false;
    this.onEndGame(true);
  }

  onEndGame(status) {
    this.checkerBoardService.hasGameEnded(status)
  }

}


