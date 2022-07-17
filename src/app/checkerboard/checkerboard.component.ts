import { Component, OnInit, Input, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  currentIndex;
  previousIndex;
  imgId: string;
  @ViewChildren(HideDirective) hideDirectives!: QueryList<HideDirective>;
  @Input() player1Active: boolean;
  @Input() player2Active: boolean;
  xPointerGrabPosition: number;
  yPointerGrabPosition: number;
  xPointerReleasePosition: number;
  yPointerReleasePosition: number;
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.items, event.previousIndex, event.currentIndex);
      this.previousIndex = this.items[event.previousIndex];
      this.currentIndex = this.items[event.currentIndex];
      // console.log('this.currentIndex', event.currentIndex);
      // console.log('this.previousIndex', event.previousIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // console.log('this.currentIndex', event.currentIndex);
      // console.log('this.previousIndex', event.previousIndex);
    }
  }

  getId(event, id) {
    // console.log('event.target.id', event.target.id);
    // console.log('id', id);
    // console.log('this.currentIndex', event.currentIndex);
  }


  addPieces() {
    this.newGame = true;
    this.disabled = true;
    this.onActivePlayer('player1');
  }

  onActivePlayer(player) {
    this.checkerBoardService.whichPlayerIsActive(player);
  }

  grabChecker(event) {
    // console.log('Pointerdown Event: ', event);
    // console.log('event value: ', event.target.value);
    this.xPointerGrabPosition = event.clientX;
    this.yPointerGrabPosition = event.clientY;
    // console.log('This is the value of xPointerGrabPosition', this.xPointerGrabPosition);
    // console.log('This is the value of yPointerdownPosition', this.yPointerGrabPosition);
    // console.log(event.path[2].cdkDropListData.index);
    // console.log('asfdlkjas;', event.currentIndex);
    // console.log('asfdlkjas;', event.previousIndex);
    // this.hideChecker(index);
  }

  placeChecker(event) {
    // console.log('is this the locationo it is dropped on', event.target.getBoundingClientRect());


    let rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let id = event.path[0].attributes[1].value;
    this.xPointerReleasePosition = event.clientX;
    this.yPointerReleasePosition = event.clientY;
    // this.checkerId = event.path[2].id;
    // this.imgId = event.path[0].attributes[2].value;
    // console.log('imgId ', this.imgId);
    console.log(event.path[2].cdkDropListData.index);
    // console.log('This is the value of xPointerReleasePosition', this.xPointerReleasePosition);
    // console.log('This is the value of yPointerReleasePosition', this.yPointerReleasePosition);
    console.log(event);
    if (this.xPointerGrabPosition < this.xPointerReleasePosition && (this.xPointerReleasePosition - this.xPointerGrabPosition) < 84) {
      console.log('You should see this calculation: ', this.xPointerReleasePosition - this.xPointerGrabPosition);
      console.log('Moved one space');

    }
    else if (this.xPointerGrabPosition < this.xPointerReleasePosition && (this.xPointerReleasePosition - this.xPointerGrabPosition) > 84 && (this.xPointerReleasePosition - this.xPointerGrabPosition) > 157) {
      console.log('You should see this calculation: ', this.xPointerReleasePosition - this.xPointerGrabPosition);
      console.log('Moved two spaces');
    }

  }

  moveCheckers3(event) {
    console.log('Event from the pointer capture', event);
  }

  onDragEnded(event: CdkDragEnd): void {
    let xPointerReleaseMinusGrab = (this.xPointerReleasePosition - this.xPointerGrabPosition);
    let xPointerGrabMinusRelease = (this.xPointerGrabPosition - this.xPointerReleasePosition);
    let yPointerReleaseMinusGrab = (this.yPointerReleasePosition - this.yPointerGrabPosition);
    let yPointerGrabMinusRelease = (this.yPointerGrabPosition - this.yPointerReleasePosition);
    let x;
    let y;
    if (xPointerGrabMinusRelease > 0) {
      x = xPointerGrabMinusRelease;
    } else if (xPointerReleaseMinusGrab > 0) {
      x = xPointerReleaseMinusGrab;
    }

    if (yPointerGrabMinusRelease > 0) {
      y = yPointerGrabMinusRelease;
    } else if (yPointerReleaseMinusGrab > 0) {
      y = yPointerReleaseMinusGrab;
    }
    console.log('x', x);
    console.log('y', y);



    if (x < 6 || y < 6 && x < 79 || y < 6 || x < 6 && y < 79) {
      event.source._dragRef.reset();
    } else {
      return;
    }
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
