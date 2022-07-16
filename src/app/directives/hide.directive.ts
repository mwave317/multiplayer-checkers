import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHide]'
})
export class HideDirective {

  @Input() id!: string;
  @HostBinding('style.display')
  shouldShow: string = '';
}
