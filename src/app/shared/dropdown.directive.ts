import {Directive, Host, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isopen = false;
  constructor() { }
  // tslint:disable-next-line:typedef
  @HostListener('click') toogleopen() {
  this.isopen = !this.isopen;
  }
}
