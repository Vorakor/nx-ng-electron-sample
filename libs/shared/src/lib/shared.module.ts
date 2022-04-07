import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageContainerComponent } from './main-page-container/main-page-container.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    TopMenuComponent,
    LeftSideNavComponent,
    FooterComponent,
    MainPageContainerComponent,
    HomeComponent,
  ],
  exports: [
    TopMenuComponent,
    LeftSideNavComponent,
    FooterComponent,
    MainPageContainerComponent,
    HomeComponent,
  ],
})
export class SharedModule {}
