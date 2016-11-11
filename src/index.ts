import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ImgToInlineSVGDirective } from './inline-svg.directive';

@NgModule({
  declarations: [ImgToInlineSVGDirective],
  imports: [HttpModule],
  exports: [ImgToInlineSVGDirective]
})
export class ImgToInlineSVGModule {}
