import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [HeaderComponent, SideNavComponent],
})
export class SharedModule {}
