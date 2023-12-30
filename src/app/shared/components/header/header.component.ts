import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
// } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // animations: [
  //   trigger('rollOut', [
  //     state(
  //       'void',
  //       style({
  //         transform: 'translateX(100%)',
  //         opacity: 0,
  //       })
  //     ),
  //     transition('* => void', [animate('500ms ease-in-out')]),
  //     transition('void => *', [animate('500ms ease-in-out')]),
  //   ]),
  // ],
})
export class HeaderComponent {
  // @ViewChild('navbar') navbar!: ElementRef;
  // showNav: boolean = false;
  // toggleNavbar() {
  //   // Access the native element
  //   // const element = this.navbar.nativeElement;
  //   // this.navbar.nativeElement.style.display = 'block';
  //   this.showNav = !this.showNav;
  // }
  // onLogout() {}
  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSideNav() {
    this.sidebarToggle.emit();
  }
}
