import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';

const components = [
  OverviewPageComponent
]

const modules = [
  CommonModule,
  SharedModule,
]


@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components
  ]
})
export class OverviewModule { }
