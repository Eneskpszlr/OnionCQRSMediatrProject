import { Routes } from '@angular/router';
import { CategoryOperation } from './features/category/category-page/category-page';
import { ProductOperation } from './features/product/product-page/product-page';
import { OrderOperation } from './features/order/order-page/order-page';
import { AppUserOperation } from './features/appUser/app-user-page/app-user-page';
import { AppUserProfileOperation } from './features/appUserProfile/app-user-profile-page/app-user-profile-page';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },

  { path: 'categories', component: CategoryOperation },
  { path: 'products', component: ProductOperation },
  { path: 'orders', component: OrderOperation },
  { path: 'users', component: AppUserOperation },
  { path: 'profiles', component: AppUserProfileOperation},

  { path: '**', redirectTo: 'categories' },
];
