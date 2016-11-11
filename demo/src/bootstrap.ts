import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ImgToInlineSVGDirective } from 'ng2-replace-img-svg-by-inline-svg';

import { DemoComponent } from './demo/demo.component';

enableProdMode();

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, ImgToInlineSVGDirective],
  bootstrap: [DemoComponent]
})
class DemoAppModule {}

platformBrowserDynamic().bootstrapModule(DemoAppModule);
