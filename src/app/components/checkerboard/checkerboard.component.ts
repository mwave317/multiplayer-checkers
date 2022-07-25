import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
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
  @ViewChildren('square') squares: QueryList<ElementRef>
  xPointerGrabPosition: number;
  yPointerGrabPosition: number;
  xPointerReleasePosition: number;
  yPointerReleasePosition: number;
  fromSquare;
  toSquare;
  items: Array<any> = [
    { squareId: '1-1', id: '1', class: 'square checkerboard-square-red', img: '' },
    { squareId: '1-2', id: '2', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { squareId: '1-3', id: '3', class: 'square checkerboard-square-red', img: '' },
    { squareId: '1-4', id: '4', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { squareId: '1-5', id: '5', class: 'square checkerboard-square-red', img: '' },
    { squareId: '1-6', id: '6', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { squareId: '1-7', id: '7', class: 'square checkerboard-square-red', img: '' },
    { squareId: '1-8', id: '8', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },

    { squareId: '2-1', id: '9', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { squareId: '2-2', id: '10', class: 'square checkerboard-square-red', img: '' },
    { squareId: '2-3', id: '11', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { squareId: '2-4', id: '12', class: 'square checkerboard-square-red', img: '' },
    { squareId: '2-5', id: '13', class: 'square checkerboard-square-black', img: ' ../../assets/images/beige-checker-piece.svg' },
    { squareId: '2-6', id: '14', class: 'square checkerboard-square-red', img: '' },
    { squareId: '2-7', id: '15', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { squareId: '2-8', id: '16', class: 'square checkerboard-square-red', img: '' },

    { squareId: '3-1', id: '17', class: 'square checkerboard-square-red', img: '' },
    { squareId: '3-2', id: '18', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { squareId: '3-3', id: '19', class: 'square checkerboard-square-red', img: '' },
    { squareId: '3-4', id: '20', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { squareId: '3-5', id: '21', class: 'square checkerboard-square-red', img: '' },
    { squareId: '3-6', id: '22', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },
    { squareId: '3-7', id: '23', class: 'square checkerboard-square-red', img: '' },
    { squareId: '3-8', id: '24', class: 'square checkerboard-square-black', img: '../../assets/images/beige-checker-piece.svg' },

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

  drop(event: CdkDragDrop<any>) {
    this.fromSquare = event.previousContainer.data;
    this.toSquare = event.container.data;
    this.hideWhichChecker();
    console.log('This is the fromSquare', this.fromSquare);
    console.log('This is the toSquare', this.toSquare);
  }

  getId(event, id) {
    console.log('event.target.id', event.target.id);
    console.log('id', id);
    // console.log('this.currentIndex', event.currentIndex);
  }


  addPieces() {
    this.newGame = true;
    this.disabled = true;
    this.sharedService.player1Active.next(true);
  }

  grabChecker(event, index) {
    this.xPointerGrabPosition = event.clientX;
    this.yPointerGrabPosition = event.clientY;
  }

  placeChecker(event, id) {
    this.xPointerReleasePosition = event.clientX;
    this.yPointerReleasePosition = event.clientY;
    console.log('Squares', this.squares);
  }

  onDragEnded(event: CdkDragEnd): void {

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

  hideWhichChecker() {
    let splitFromSquare = this.fromSquare.squareId.split('-');
    let fromSquareRow = parseInt(splitFromSquare[0]);
    let fromSquareColumn = parseInt(splitFromSquare[1]);
    // console.log('splitFromSquare', splitFromSquare);
    // console.log('fromSquareRow', fromSquareRow);
    // console.log('fromSquareColumn', fromSquareColumn);


    let splitToSquare = this.toSquare.squareId.split('-');
    let toSquareRow = parseInt(splitToSquare[0]);
    let toSquareColumn = parseInt(splitToSquare[1]);
    // console.log('splitToSquare', splitToSquare);
    // console.log('toSquareRow', toSquareRow);
    // console.log('toSquareColumn', toSquareColumn);

    if (fromSquareRow < toSquareRow && fromSquareColumn > toSquareColumn) {
      toSquareRow -= 1;
      toSquareColumn += 1;

      // console.log('toSquareRow after the addition', toSquareRow);
      // console.log('toSquareColumn after the subtraction', toSquareColumn);
      let deleteChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.hideChecker('14')
    }

    if (fromSquareRow < toSquareRow && fromSquareColumn < toSquareColumn) {
      toSquareRow -= 1;
      toSquareColumn -= 1;

      // console.log('toSquareRow after the addition', toSquareRow);
      // console.log('toSquareColumn after the subtraction', toSquareColumn);
      let deleteChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.hideChecker('14')
    }





    if (fromSquareRow > toSquareRow && fromSquareColumn > toSquareColumn) {
      toSquareRow += 1;
      toSquareColumn += 1;
      let deleteChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.hideChecker('14')
    }

    if (fromSquareRow > toSquareRow && fromSquareColumn < toSquareColumn) {
      toSquareRow += 1;
      toSquareColumn -= 1;
      let deleteChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.hideChecker('14')
    }
  }

  hideChecker(id: string) {
    console.log('id', id);
    this.hideDirectives.find((p) => p.id === id).shouldShow = 'none';
  }



}
