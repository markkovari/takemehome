import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebar') public drawer: MatDrawer;

  constructor(private readonly sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.setDrawer(this.drawer);
  }

  toggle() {
    this.sidebarService.toggle();
  }
}
