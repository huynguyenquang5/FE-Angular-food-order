import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailStoreComponent} from "./detail-store/detail-store.component";
import {HomeBodyComponent} from "./home/home-body/home-body.component";

const routes: Routes = [
  {
    path:"", component: HomeBodyComponent
  },
  {
    path: 'store/:storeId',
    component: DetailStoreComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
