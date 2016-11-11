import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SVGCache } from './svg-cache.service';

@Directive({
  selector: '[ImgToInlineSVG]',
  providers: [SVGCache]
})
export class ImgToInlineSVGDirective implements OnInit, OnChanges {
  @Input() src: string;
  @Input() replaceContents: boolean = true;
  @Input() cacheSVG: boolean = true;
  @Input() removeSVGAttributes: Array<string>;

  @Output() onSVGInserted: EventEmitter<SVGElement> = new EventEmitter<SVGElement>();

  /** @internal */
  private _absUrl: string;

  constructor(
    @Inject(DOCUMENT) private _document /*: HTMLDocument*/,
    private _el: ElementRef,
    private _svgCache: SVGCache) {
  }

  ngOnInit(): void {
    this._insertSVG();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this._insertSVG();
    }
  }

  /** @internal */
  private _insertSVG(): void {
    // Check if a URL was actually passed into the directive
    if (!this.src) {
      console.error('No URL passed to [src]!');
      return;
    }

    // Get absolute URL, and check if it's actually new
    const absUrl = this._getAbsoluteUrl(this.src);

    if (absUrl !== this._absUrl) {
      this._absUrl = absUrl;

      // Fetch SVG via cache mechanism
      this._svgCache.getSVG(this._absUrl, this.cacheSVG)
        .subscribe(
          (svg: SVGElement) => {
            // replace Image with inline SVG
            if (svg && this._el.nativeElement) {
              if (this.replaceContents) {
                this._el.nativeElement.outerHTML = '';
              }

              if (this.removeSVGAttributes) {
                this._removeAttributes(svg, this.removeSVGAttributes);
              }
              svg['class'] = this._el.nativeElement.className;
              this._el.nativeElement.outerHTML(svg);
              this.onSVGInserted.emit(svg);
            }
          },
          (err: any) => {
            console.error(err);
          }
        );
    }
  }

  /** @internal */
  private _getAbsoluteUrl(url: string): string {
    const base = this._document.createElement('BASE') as HTMLBaseElement;
    base.href = url;

    return base.href;
  }

  /** @internal */
  private _removeAttributes(svg: SVGElement, attrs: Array<string>) {
    const innerEls = svg.getElementsByTagName('*');

    for (let i = 0; i < innerEls.length; i++) {
      const elAttrs = innerEls[i].attributes;

      for (let j = 0; j < elAttrs.length; j++) {
        if (attrs.indexOf(elAttrs[j].name.toLowerCase()) > -1) {
          innerEls[i].removeAttribute(elAttrs[j].name);
        }
      }
    }
  }
}
