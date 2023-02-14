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
    //Home JS files
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/js/common_scripts.min.js";
    this.elementRef.nativeElement.appendChild(s);

    let s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../../assets/js/common_func.js";
    this.elementRef.nativeElement.appendChild(s1);

    // Admin JS files
    let s3 = document.createElement("script");
    s3.type = "text/javascript";
    s3.src = "../../assets/admin_section/vendor/bootstrap/js/bootstrap.bundle.min.js";
    this.elementRef.nativeElement.appendChild(s3);

    let s5 = document.createElement("script");
    s5.type = "text/javascript";
    s5.src = "../../assets/admin_section/vendor/chart.js/Chart.min.js";
    this.elementRef.nativeElement.appendChild(s5);


    let s8 = document.createElement("script");
    s8.type = "text/javascript";
    s8.src = "../../assets/admin_section/vendor/datatables/dataTables.bootstrap4.js";
    this.elementRef.nativeElement.appendChild(s8);
  }

  title = 'FE-Angular-food-order';
}
