import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from './grid-module/grid-module.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    GridModule
  ],
  declarations: [],
  exports:[GridModule,TranslateModule],
})
export class SharedModule { }
