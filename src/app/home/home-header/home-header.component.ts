import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  ngOnInit(): void {
    this.list.push(10)
  }
  constructor() {
  }
  list: number[] = [1, 2, 3, 4, 5,6,7,8,9]
}

