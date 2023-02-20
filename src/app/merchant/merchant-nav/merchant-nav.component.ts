import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-merchant-nav',
  templateUrl: './merchant-nav.component.html',
  styleUrls: ['./merchant-nav.component.css'],
})
export class MerchantNavComponent implements OnInit {
  @Input() userId!: number;
  constructor(private elementRef: ElementRef) {
    let s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "assets/admin_section/vendor/jquery/jquery.min.js";
    this.elementRef.nativeElement.appendChild(s2);

    let s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "assets/admin_section/vendor/bootstrap/js/bootstrap.min.js";
    this.elementRef.nativeElement.appendChild(s1);
  }
  ngOnInit() {

  }

}
