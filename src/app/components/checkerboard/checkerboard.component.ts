import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
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
  endGame: boolean = false;
  @ViewChildren(HideDirective) hideDirectives!: QueryList<HideDirective>;
  @ViewChildren('square') squares: QueryList<ElementRef>
  fromSquare;
  toSquare;
  removeChecker: string;
  hideCheckerId: number = 0;
  counter: number = 0;
  checkers: Array<any> = [];
  constructor(private sharedService: SharedService, private screenService: ScreenService) { }

  ngOnInit(): void {
    this.sharedService.sendStartGame().subscribe(data => this.addPieces());
    this.sharedService.sendEndGame().subscribe(data => {
      this.endGame = data;
      this.clearCheckers();
    });
    this.checkers = this.sharedService.sendCheckers();
  }

  ngAfterViewInit(): void {
    this.screenService.isBelowLg().subscribe((isBelowLg: BreakpointState) => {
      this.isBelowLg = isBelowLg.matches;
    });

  }

  drop(event: CdkDragDrop<any>) {
    this.fromSquare = event.previousContainer.data;
    this.toSquare = event.container.data;
    if (event.container.data.class === 'square checkerboard-square-black' && event.container.data.class !== 'square checkerboard-square-red' && this.fromSquare.squareId != this.toSquare.squareId && this.toSquare.img === '') {
      // console.log('ad', this.fromSquare.squareId);
      // console.log('asfas', this.toSquare.squareId);
      event.container.data.img = event.previousContainer.data.img;
      event.previousContainer.data.img = ''
      this.hideWhichChecker();
      this.dropChecker(this.toSquare);
    }
    // console.log('This is the fromSquare', this.fromSquare);
    // console.log('This is the toSquare', this.toSquare);

  }

  addPieces() {
    this.newGame = true;
    this.disabled = true;
    this.sharedService.player1Active.next(true);
    this.checkers = this.sharedService.sendCheckers();
  }

  clearCheckers() {
    if (this.endGame) {
      for (let check of this.checkers) {
        check.img = '';
      }
    }
  }

  dropChecker(sqaure) {
    // console.log('Square', sqaure);
    // console.log('This is the fromSquare in the dropChecker', this.fromSquare);
    // console.log('This is the toSquare in the dropChecker', this.toSquare);
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
    console.log('this.toSquare.img', this.toSquare.img)
    if (this.toSquare.img.includes('gray') && this.toSquare.squareId === '1-2' || this.toSquare.squareId === '1-4' || this.toSquare.squareId === '1-6' || this.toSquare.squareId === '1-8') {
      this.toSquare.img = '../../assets/images/gray-king-checker-piece.svg';
    }
    if (this.toSquare.img.includes('red') && this.toSquare.squareId === '8-1' || this.toSquare.squareId === '8-3' || this.toSquare.squareId === '8-5' || this.toSquare.squareId === '8-7') {
      this.toSquare.img = '../../assets/images/red-king-checker-piece.svg';
    }
  }

  hideWhichChecker() {
    let splitFromSquare = this.fromSquare.squareId.split('-');
    let fromSquareRow = parseInt(splitFromSquare[0]);
    let fromSquareColumn = parseInt(splitFromSquare[1]);

    let splitToSquare = this.toSquare.squareId.split('-');
    let toSquareRow = parseInt(splitToSquare[0]);
    let toSquareColumn = parseInt(splitToSquare[1]);
    let removeChecker = '';

    if (fromSquareRow < toSquareRow && fromSquareColumn > toSquareColumn) {
      toSquareRow -= 1;
      toSquareColumn += 1;

      if (toSquareRow !== fromSquareRow || toSquareColumn !== fromSquareColumn && this.removeChecker) {
        removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
        this.getIdOfCheckerToHide(removeChecker);
        this.counter++;
        console.log('Counter', this.counter);
        console.log('hello');

      }
    }

    if (fromSquareRow < toSquareRow && fromSquareColumn < toSquareColumn) {
      toSquareRow -= 1;
      toSquareColumn -= 1;

      removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();

      if (toSquareRow !== fromSquareRow || toSquareColumn !== fromSquareColumn && this.removeChecker) {
        this.counter++;
        this.getIdOfCheckerToHide(removeChecker);
        console.log('Counter', this.counter)
      }
    }

    if (fromSquareRow > toSquareRow && fromSquareColumn > toSquareColumn) {
      toSquareRow += 1;
      toSquareColumn += 1;
      removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();
      if (toSquareRow !== fromSquareRow || toSquareColumn !== fromSquareColumn && this.removeChecker) {

        this.counter++;
        console.log('Counter', this.counter)
        this.getIdOfCheckerToHide(removeChecker);
      }
    }

    if (fromSquareRow > toSquareRow && fromSquareColumn < toSquareColumn) {
      toSquareRow += 1;
      toSquareColumn -= 1;
      removeChecker = toSquareRow.toString() + '-' + toSquareColumn.toString();

      if (toSquareRow != fromSquareRow || toSquareColumn != fromSquareColumn && this.removeChecker) {
        this.counter++;
        console.log('Counter', this.counter)
        this.getIdOfCheckerToHide(removeChecker);
      }
    }
  }

  getIdOfCheckerToHide(idOfSquare: string) {
    this.checkers.find(x => {
      this.hideCheckerId = x.id - 1;
      this.checkers.find(x => x.squareId === idOfSquare).img = '';
    });
  }
}
