# ng2-replace-img-svg-by-inline-svg

Angular 2 directive for replace an image SVG by inline SVG within an element, allowing for easily styling
with CSS and kip all className.

This is based on [ng2-inline-svg](https://github.com/arkon/ng2-inline-svg.git),
except this is meant purely for replace iamge SVG files within inline svg an element, without the extra things like
font icons.

## Installation

```shell
npm install --save ng2-replace-img-svg-by-inline-svg
```


## Usage

Add `ImgToInlineSVGModule` to your list of module imports:

```typescript
import { ImgToInlineSVGModule } from 'ng2-replace-img-svg-by-inline-svg';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ImgToInlineSVGModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

You can then use the directive in your templates:

```typescript
@Component({
  selector: 'app',
  template: `
  	<img class="myStlye" ImgToInlineSVG src="/img/image.svg"/>
  `
})
export class AppComponent {
}
```

The SVG file (if found) will be inserted *inside* the element with the `[ImgToInlineSVGModule]` directive.
