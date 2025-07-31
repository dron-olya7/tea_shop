import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { TeaDetailsComponent } from './tea-details/tea-details.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'tea-details/:id', component: TeaDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
