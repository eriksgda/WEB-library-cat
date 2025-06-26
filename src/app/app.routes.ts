import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {WishlistComponent} from './features/wishlist/wishlist.component';

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "wishlist",
    component: WishlistComponent,
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];
