import { AfterViewInit, Component, OnInit, Input, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BreakpointState } from '@angular/cdk/layout';
import { HideDirective } from '../../directives/hide.directive';

import { SharedService } from '../../services/shared.service';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'app-checkerboard',
  templateUrl: './checkerboard.component.html',
  styleUrls: ['./checkerboard.component.css'],

})
export class CheckerboardComponent implements OnInit, AfterViewInit {

  isBelowLg: boolean = false;
  disabled: boolean = false;
  newGame: boolean = false;
  currentIndex;
  previousIndex;
  imgId: string;
  @ViewChildren(HideDirective) hideDirectives!: QueryList<HideDirective>;
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

  constructor(private sharedService: SharedService, private screenService: ScreenService) { }

  ngOnInit(): void {
    this.sharedService.sendStartGame().subscribe(data => this.addPieces());
    this.sharedService.sendEndGame().subscribe(data => this.newGame = data);
  }

  ngAfterViewInit(): void {
    this.screenService.isBelowLg().subscribe((isBelowLg: BreakpointState) => {
      this.isBelowLg = isBelowLg.matches;
    });

  }

  drop(event: CdkDragDrop<string[]>, id) {
    console.log(event.container.data[event.currentIndex]['id']);
    if (event.previousContainer === event.container) {
      moveItemInArray(this.items, event.previousIndex, event.currentIndex);
      this.previousIndex = this.items[event.previousIndex];
      this.currentIndex = this.items[event.currentIndex];
      console.log(event.container.data[event.currentIndex]['id']);
      // console.log('this.currentIndex', event.currentIndex);
      // console.log('this.previousIndex', event.previousIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log(event.container.data[event.currentIndex]['id']);
      // console.log('this.currentIndex', event.currentIndex);
      // console.log('this.previousIndex', event.previousIndex);
    }
  }

  getId(event, id) {
    // console.log('event.target.id', event.target.id);
    console.log('id', id);
    // console.log('this.currentIndex', event.currentIndex);
  }


  addPieces() {
    this.newGame = true;
    this.disabled = true;
    this.sharedService.player1Active.next(true);
  }

  onActivePlayer(player) {
  }

  grabChecker(event, index) {
    this.xPointerGrabPosition = event.clientX;
    this.yPointerGrabPosition = event.clientY;

  }

  placeChecker(event, id) {
    this.xPointerReleasePosition = event.clientX;
    this.yPointerReleasePosition = event.clientY;
    console.log('This is the ID', id);
  }

  moveCheckers3(event) {
    console.log('Event from the pointer capture', event);
    console.log('This is the events pointer ID', event.ponterId);
  }

  onDragEnded(event: CdkDragEnd, id): void {
    console.log('This is the id of thee item being dragged', id);
    console.log(event.source.getFreeDragPosition());
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

    if (this.isBelowLg) {
      if (x === undefined || y === undefined || y > 70 && x > 70 || x < 10 && y < 212 || x < 212 && y < 10) {
        event.source._dragRef.reset();
      }
    } else {

      if (x === undefined || y === undefined || x < 6 || y < 6 || y < 40 && x < 600 || x < 40 && y < 600 || x > 201 && y > 201) {
        event.source._dragRef.reset();
      }

    }
  }

  hideChecker(id: number) {
    console.log('id', id);
    this.hideDirectives.find((p) => p.id === id.toString()).shouldShow = 'none';
  }



}
