import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo',
  template: `

    <img ImgToInlineSVG class="demo-svg1" src="'img/image.svg'"></div>
    <img ImgToInlineSVG class="demo-svg2" src="'img/image.svg'" [removeSVGAttributes]="['fill']"></div>
  `
})
export class DemoComponent implements OnInit {
  private _showOther: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this._showOther = true;
    }, 100);
  }
}
