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
    { id: 'cell-1-1', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-1-2', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-1-3', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-1-4', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-1-5', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-1-6', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-1-7', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-1-8', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },

    { id: 'cell-2-1', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-2-1', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-2-3', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-2-4', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-2-5', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-2-6', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-2-7', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-2-8', class: 'square checkerboard-square-red', img: '' },

    { id: 'cell-3-1', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-3-2', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-3-3', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-3-4', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-3-5', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-3-6', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { id: 'cell-3-7', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-3-8', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },

    { id: 'cell-4-1', class: 'square checkerboard-square-black', img: '' },
    { id: 'cell-4-2', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-4-3', class: 'square checkerboard-square-black', img: '' },
    { id: 'cell-4-4', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-4-5', class: 'square checkerboard-square-black', img: '' },
    { id: 'cell-4-6', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-4-7', class: 'square checkerboard-square-black', img: '' },
    { id: 'cell-4-8', class: 'square checkerboard-square-red', img: '' },

    { id: 'cell-5-1', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-5-2', class: 'square checkerboard-square-black', img: '' },
    { id: 'cell-5-3', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-5-4', class: 'square checkerboard-square-black', img: '' },
    { id: 'cell-5-5', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-5-6', class: 'square checkerboard-square-black', img: '' },
    { id: 'cell-5-7', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-5-8', class: 'square checkerboard-square-black', img: '' },

    { id: 'cell-6-1', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-6-2', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-6-3', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-6-4', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-6-5', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-6-6', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-6-7', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-6-8', class: 'square checkerboard-square-red', img: '' },

    { id: 'cell-7-1', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-7-2', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-7-3', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-7-4', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-7-5', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-7-6', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-7-7', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-7-8', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },

    { id: 'cell-8-1', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-8-2', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-8-3', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-8-4', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-8-5', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-8-6', class: 'square checkerboard-square-red', img: '' },
    { id: 'cell-8-7', class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { id: 'cell-8-8', class: 'square checkerboard-square-red', img: '' },
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

  moveChecker(piece) {
    console.log(piece);
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


