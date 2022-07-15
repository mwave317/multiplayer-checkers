import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CheckerboardService } from '../services/checkerboard.service';

@Component({
  selector: 'app-checkerboard',
  templateUrl: './checkerboard.component.html',
  styleUrls: ['./checkerboard.component.css']
})
export class CheckerboardComponent implements OnInit {
  disabled: boolean = false;
  newGame: boolean = false;
  previousIndex;
  @Input() player1Active: boolean;
  @Input() player2Active: boolean;
  xPointerDownPosition: number;
  yPointerDownPosition: number;
  xPointerUpPosition: number;
  yPointerUpPosition: number;
  checker0: boolean = true;
  checker1: boolean = false;
  checker2: boolean = true;
  checker3: boolean = true;
  checker4: boolean = true;
  checker5: boolean = true;

  items: Array<any> = [
    // ../../assets/images/${this.checkers[i].color}-checker-piece.svg
    // ../../assets/images/gray-checker-piece.svg
    { draggable: false, addClass: 'checker1', id: 'cell-1-1', class: 'square checkerboard-square-red', img: '' },
    { draggable: true, addClass: 'checker2', id: 'cell-1-2', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { addClass: 'checker3', id: 'cell-1-3', class: 'square checkerboard-square-red', img: '' },
    { addClass: 'checker4', id: 'cell-1-4', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { addClass: 'checker5', id: 'cell-1-5', class: 'square checkerboard-square-red', img: '' },
    { addClass: 'checker6', id: 'cell-1-6', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { addClass: 'checker7', id: 'cell-1-7', class: 'square checkerboard-square-red', img: '' },
    { addClass: 'checker8', id: 'cell-1-8', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },

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

  drop(event: CdkDragDrop<string>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.previousIndex = this.items[event.previousIndex];
    console.log('this.previousIndex', event);
  }


  addPieces() {
    this.newGame = true;
    this.disabled = true;
    this.onActivePlayer('player1');
  }

  onActivePlayer(player) {
    this.checkerBoardService.whichPlayerIsActive(player);
  }

  moveChecker(event) {
    console.log('Pointerdown Event: ', event);
    this.xPointerDownPosition = event.clientX;
    this.yPointerDownPosition = event.clientY;
    console.log('This is the value of xPointerdownPosition', this.xPointerDownPosition);
    console.log('This is the value of yPointerdownPosition', this.yPointerDownPosition);
    console.log(event.path[2].cdkDropListData.index);
    // this.checker1 = false;
  }

  moveChecker1(event) {
    this.checker1 = false;
    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    this.xPointerUpPosition = event.clientX;
    this.yPointerUpPosition = event.clientY;
    console.log(event.path[2].cdkDropListData.index);
    console.log('This is the value of xPointerupPosition', this.xPointerUpPosition);
    console.log('This is the value of yPointerupPosition', this.yPointerUpPosition);
    console.log(event);
    if (this.xPointerDownPosition < this.xPointerUpPosition && (this.xPointerUpPosition - this.xPointerDownPosition) < 84) {
      console.log('You should see this calculation: ', this.xPointerUpPosition - this.xPointerDownPosition);
      console.log('Moved one space');
      console.log("Event Path", event.path[2].id);
    }
    else if (this.xPointerDownPosition < this.xPointerUpPosition && (this.xPointerUpPosition - this.xPointerDownPosition) > 84 && (this.xPointerUpPosition - this.xPointerDownPosition) > 157) {
      console.log('You should see this calculation: ', this.xPointerUpPosition - this.xPointerDownPosition);
      console.log('Moved two spaces');
      console.log('This is the value of checker1', this.checker1)
    }
  }

  moveCheckers3(event) {
    console.log(event);
  }
  stopGame() {
    this.newGame = false;
    this.disabled = false;

    this.player1Active = false;
    this.player2Active = false;
  }

}


