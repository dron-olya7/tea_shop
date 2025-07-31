import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'catalog', loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule) },
  { path: 'order', loadChildren: () => import('./views/create-order/create-order.module').then(m => m.CreateOrderModule) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
