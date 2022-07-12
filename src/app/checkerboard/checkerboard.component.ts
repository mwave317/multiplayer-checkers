import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkerboard',
  templateUrl: './checkerboard.component.html',
  styleUrls: ['./checkerboard.component.css']
})
export class CheckerboardComponent implements OnInit {

  checkers = [
    '#cell-1-2', '#cell-1-4', '#cell-1-6', '#cell-1-8',
    '#cell-2-1', '#cell-2-3', '#cell-2-5', '#cell-2-7',
    '#cell-3-2', '#cell-3-4', '#cell-3-6', '#cell-3-8',
    '#cell-6-2', '#cell-6-4', '#cell-6-6', '#cell-6-8',
    '#cell-7-1', '#cell-7-3', '#cell-7-5', '#cell-7-7',
    '#cell-8-2', '#cell-8-4', '#cell-8-6', '#cell-8-8'
  ];
  constructor() { }

  ngOnInit(): void {
    this.addPieces();
  }


  addPieces() {
    for (let i = 0; i < this.checkers.length; i++) {
      let element = document.querySelector(this.checkers[i]);
      let elem = document.createElement('img');
      elem.src = '../../assets/images/red-checker-piece.svg';
      elem.style.height = '26px';
      elem.style.margin = '1px 0px 0px 3px';
      element.appendChild(elem);
    }

  }
}
