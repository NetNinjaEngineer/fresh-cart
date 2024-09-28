import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
   selector: '[appScroll]',
   standalone: true,
})
export class ScrollDirective {
   constructor(private _elementReference: ElementRef, private _renderer2: Renderer2) { }

   @HostListener('window:scroll') onScroll() {
      if (scrollY > 300) {
         this._renderer2.addClass(this._elementReference.nativeElement, 'px-5');
         this._renderer2.addClass(this._elementReference.nativeElement, 'shadow');
      } else {
         this._renderer2.removeClass(this._elementReference.nativeElement, 'px-5');
         this._renderer2.removeClass(this._elementReference.nativeElement, 'shadow');
      }
   }
}
