import { Component, OnInit, Input, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CheckerboardService } from '../services/checkerboard.service';
import { HideDirective } from '../directives/hide.directive';

@Component({
  selector: 'app-checkerboard',
  templateUrl: './checkerboard.component.html',
  styleUrls: ['./checkerboard.component.css']
})
export class CheckerboardComponent implements OnInit {

  disabled: boolean = false;
  newGame: boolean = false;
  previousIndex;
  imgId: string;
  @ViewChildren(HideDirective) hideDirectives!: QueryList<HideDirective>;
  @Input() player1Active: boolean;
  @Input() player2Active: boolean;
  xPointerDownPosition: number;
  yPointerDownPosition: number;
  xPointerUpPosition: number;
  yPointerUpPosition: number;
  items: Array<any> = [
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
    { class: 'square checkerboard-square-black', img: '../../assets/images/gray-checker-piece.svg' },
    { class: 'square checkerboard-square-red', img: '' },
  ];

  constructor(private checkerBoardService: CheckerboardService, private renderer: Renderer2) { }

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

  moveChecker(event, index) {
    console.log('Pointerdown Event: ', event);
    this.xPointerDownPosition = event.clientX;
    this.yPointerDownPosition = event.clientY;
    console.log('This is the value of xPointerdownPosition', this.xPointerDownPosition);
    console.log('This is the value of yPointerdownPosition', this.yPointerDownPosition);
    console.log(event.path[2].cdkDropListData.index);
    // this.hideChecker(index);
  }

  moveChecker1(event) {
    console.log('is this the locationo it is dropped on', event.target.getBoundingClientRect());
    // this.checker1 = false;

    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let id = event.path[0].attributes[1].value;
    this.xPointerUpPosition = event.clientX;
    this.yPointerUpPosition = event.clientY;
    // this.checkerId = event.path[2].id;
    this.imgId = event.path[0].attributes[2].value;
    console.log('imgId ', this.imgId);
    console.log(event.path[2].cdkDropListData.index);
    console.log('This is the value of xPointerupPosition', this.xPointerUpPosition);
    console.log('This is the value of yPointerupPosition', this.yPointerUpPosition);
    console.log(event);
    if (this.xPointerDownPosition < this.xPointerUpPosition && (this.xPointerUpPosition - this.xPointerDownPosition) < 84) {
      console.log('You should see this calculation: ', this.xPointerUpPosition - this.xPointerDownPosition);
      console.log('Moved one space');

    }
    else if (this.xPointerDownPosition < this.xPointerUpPosition && (this.xPointerUpPosition - this.xPointerDownPosition) > 84 && (this.xPointerUpPosition - this.xPointerDownPosition) > 157) {
      console.log('You should see this calculation: ', this.xPointerUpPosition - this.xPointerDownPosition);
      console.log('Moved two spaces');
      // console.log('This is the value of checker1', this.checker1)
    }
    // this.elementRef.nativeElement.style.display = "none";
    // this.renderer.setStyle(this.delete.nativeElement, 'display', 'none');
    // document.getElementById(this.imgId).style.display = "none";
  }

  testing(id) {
    console.log('id', id);
  }

  moveCheckers3(event) {
    console.log(event);
  }

  hideChecker(id: number) {
    console.log('id', id);
    this.hideDirectives.find((p) => p.id === id.toString()).shouldShow = 'none';
  }

  stopGame() {
    this.newGame = false;
    this.disabled = false;

    this.player1Active = false;
    this.player2Active = false;
  }

}