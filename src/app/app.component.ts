import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
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

  title = 'FE-Angular-food-order';
}
