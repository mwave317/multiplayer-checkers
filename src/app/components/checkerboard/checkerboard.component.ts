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
  @ViewChildren(HideDirective) hideDirectives!: QueryList<HideDirective>;
  @ViewChildren('square') squares: QueryList<ElementRef>
  xPointerGrabPosition: number;
  yPointerGrabPosition: number;
  xPointerReleasePosition: number;
  yPointerReleasePosition: number;
  fromSquare;
  toSquare;
  xAxis;
  yAxis;
  removeChecker: string = '';
  hideCheckerId: number = 0;
  items: Array<any> = [
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
    if (event.container.data.class === 'square checkerboard-square-black' && event.container.data.class !== 'square checkerboard-square-red') {
      event.container.data.img = event.previousContainer.data.img;
      event.previousContainer.data.img = ''
      console.log('event container', event.container.data);
    }
    this.hideWhichChecker();


    // console.log('This is the fromSquare', this.fromSquare);
    // console.log('This is the toSquare', this.toSquare);
    this.dropChecker(this.toSquare);
  }

  addPieces() {
    this.newGame = true;
    this.disabled = true;
    this.sharedService.player1Active.next(true);
  }

  grabChecker(event) {
    this.xPointerGrabPosition = event.clientX;
    this.yPointerGrabPosition = event.clientY;
  }

  dropChecker(sqaure) {
    console.log('Square', sqaure);

    if (sqaure.img.includes('gray')) {

      this.sharedService.player1Active.next(false);
      this.sharedService.player2Active.next(true);
    }
    else {
      this.sharedService.player1Active.next(true);
      this.sharedService.player2Active.next(false);
    }
    this.kingMe();
  }

  kingMe() {
    if (this.toSquare.img.includes('gray') && this.toSquare.squareId === '1-2' || this.toSquare.squareId === '1-4' || this.toSquare.squareId === '1-6' || this.toSquare.squareId === '1-8') {
      this.toSquare.img = '../../assets/images/gray-king-checker-piece.svg';
    }
    if (this.toSquare.img.includes('red') && this.toSquare.squareId === '8-1' || this.toSquare.squareId === '8-3' || this.toSquare.squareId === '8-5' || this.toSquare.squareId === '8-7') {
      this.toSquare.img = '../../assets/images/red-king-checker-piece.svg';
    }
  }

  placeChecker(event) {
    // console.log('This is coming from the placeChecker', event);
    this.xPointerReleasePosition = event.clientX;
    this.yPointerReleasePosition = event.clientY;
  }

  onDragEnded(event: CdkDragEnd): void {
    console.log('This is coming from the onDragEnded');
    // console.log('this.toSquareadfadsf', this.toSquare)
    // console.log(event.source.getFreeDragPosition());
    let xPointerReleaseMinusGrab = (this.xPointerReleasePosition - this.xPointerGrabPosition);
    let xPointerGrabMinusRelease = (this.xPointerGrabPosition - this.xPointerReleasePosition);
    let yPointerReleaseMinusGrab = (this.yPointerReleasePosition - this.yPointerGrabPosition);
    let yPointerGrabMinusRelease = (this.yPointerGrabPosition - this.yPointerReleasePosition);

    if (xPointerGrabMinusRelease > 0) {
      this.xAxis = xPointerGrabMinusRelease;
    } else if (xPointerReleaseMinusGrab > 0) {
      this.xAxis = xPointerReleaseMinusGrab;
    }

    if (yPointerGrabMinusRelease > 0) {
      this.yAxis = yPointerGrabMinusRelease;
    } else if (yPointerReleaseMinusGrab > 0) {
      this.yAxis = yPointerReleaseMinusGrab;
    }
    console.log('xAxis', this.xAxis);
    console.log('yAxis', this.yAxis);

    if (this.isBelowLg) {
      console.log('isBelow')
      if (this.xAxis === undefined || this.yAxis === undefined || this.yAxis > 70 && this.xAxis > 70 || this.xAxis < 10 && this.yAxis < 212 || this.xAxis < 212 && this.yAxis < 10) {
        event.source._dragRef.reset();
      }
    } else {
      console.log('Not below')
      if (this.xAxis === undefined || this.yAxis === undefined || this.xAxis < 6 || this.yAxis < 6 || this.yAxis < 40 && this.xAxis < 600 || this.xAxis < 40 && this.yAxis < 600 || this.xAxis > 201 && this.yAxis > 201) {
        console.log('Are you seeing this today')
        event.source._dragRef.reset();
      }

    }
  }

  hideWhichChecker() {
    let splitFromSquare = this.fromSquare.squareId.split('-');
    let fromSquareRow = parseInt(splitFromSquare[0]);
    let fromSquareColumn = parseInt(splitFromSquare[1]);

    let splitToSquare = this.toSquare.squareId.split('-');
    let toSquareRow = parseInt(splitToSquare[0]);
    let toSquareColumn = parseInt(splitToSquare[1]);

    if (fromSquareRow < toSquareRow && fromSquareColumn > toSquareColumn) {
      toSquareRow -= 1;
      toSquareColumn += 1;

      this.removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.getIdOfCheckerToHide(this.removeChecker);
    }

    else if (fromSquareRow < toSquareRow && fromSquareColumn < toSquareColumn) {
      toSquareRow -= 1;
      toSquareColumn -= 1;

      this.removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.getIdOfCheckerToHide(this.removeChecker);
    }

    else if (fromSquareRow > toSquareRow && fromSquareColumn > toSquareColumn) {
      toSquareRow += 1;
      toSquareColumn += 1;
      this.removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.getIdOfCheckerToHide(this.removeChecker);
    }

    else if (fromSquareRow > toSquareRow && fromSquareColumn < toSquareColumn) {
      toSquareRow += 1;
      toSquareColumn -= 1;
      this.removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      this.getIdOfCheckerToHide(this.removeChecker);
    }
  }

  getIdOfCheckerToHide(idOfSquare: string) {
    this.items.find(x => {
      if (x.squareId === idOfSquare) {
        this.hideCheckerId = x.id - 1;
        this.items.find(x => x.squareId === this.removeChecker).img = ''
      }
    });
  }
}
