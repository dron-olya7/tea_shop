import { TeaCard } from './types/tea-card.type';
import { PopupComponent } from './common/popup/popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { TeaCardComponent } from './common/tea-card/tea-card.component';
import { LoaderComponent } from './common/loader/loader.component';

@NgModule({
  declarations: [
   HeaderComponent,
   FooterComponent,
   PopupComponent,
   TeaCardComponent,
   LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    LoaderComponent,
    TeaCardComponent
  ]
})
export class SharedModule { }
