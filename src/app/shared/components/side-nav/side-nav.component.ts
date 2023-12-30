import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input() isOpen: boolean = false;
  listItems: { id: number; title: string; icon: string }[] = [
    {
      id: 1,
      title: 'Home',
      icon: 'fa-solid fa-house',
    },
    {
      id: 2,
      title: 'About',
      icon: 'fa-solid fa-list-alt ',
    },
    {
      id: 3,
      title: 'Settings',
      icon: 'fa-solid fa-gear',
    },
    {
      id: 4,
      title: 'Inventory',
      icon: 'fa-solid fa-business-time',
    },
    {
      id: 5,
      title: 'Tasks',
      icon: 'fa-solid fa-house',
    },
    {
      id: 6,
      title: 'Projects',
      icon: 'fa-solid fa-folder',
    },
    {
      id: 7,
      title: 'Statuses',
      icon: 'fa-solid fa-house',
    },
    {
      id: 8,
      title: 'Products',
      icon: 'fa-solid fa-layer-group',
    },
    {
      id: 9,
      title: 'Profile',
      icon: 'fa-solid fa-user',
    },
    {
      id: 10,
      title: 'Contact',
      icon: 'fa-solid fa-phone',
    },
  ];
}
