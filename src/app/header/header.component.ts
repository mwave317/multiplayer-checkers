import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  player1score: number = 0;
  player2score: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
