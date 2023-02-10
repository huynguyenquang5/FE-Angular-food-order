import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Store} from "../../model/store/store";

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit, AfterViewInit{
  stores: Store[] = [];
  constructor(private elementRef: ElementRef) {
  }
  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/js/common_scripts.min.js";
    this.elementRef.nativeElement.appendChild(s);

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../../assets/js/common_func.js";
    this.elementRef.nativeElement.appendChild(s1);
  }

  ngOnInit() {
  }
}
