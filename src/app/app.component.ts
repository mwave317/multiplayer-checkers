import { Component, Input, ViewChild } from '@angular/core';
import { CheckerboardComponent } from './checkerboard/checkerboard.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  player1Active: boolean;
  player2Active: boolean;
  @ViewChild(CheckerboardComponent, { static: true }) child: CheckerboardComponent;

}
