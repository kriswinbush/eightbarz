import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[pdiDropzone]'
})
export class DropzoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  ondragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }
  @HostListener('dragleave', ['$event'])
  ondragleave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  } 

}
