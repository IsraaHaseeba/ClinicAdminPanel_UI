import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  sideMenuItems: any[] = [
    {
      title: 'Doctors',
      path: '/doctors'
    },
    {
      title: 'Patients',
      path: '/patients'
    },
    {
      title: 'System Lookups',
      path: '/lookups'
    },
    {
      title: 'Appointments',
      path: '/appointments'
    }
  ];

}
