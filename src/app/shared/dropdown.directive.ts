import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('style.backgroundColor') color = '';

  @HostListener('click') toggleOpen(eventData : Event){
    this.color = 'red';
  } 
}
