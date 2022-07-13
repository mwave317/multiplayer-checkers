import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @HostBinding('style.background') private background = "#ebebeb";
  constructor() {

  }

  @HostListener('dragover', ["$event"])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ["$event"])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
  }

  @HostListener("drop", ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

}
