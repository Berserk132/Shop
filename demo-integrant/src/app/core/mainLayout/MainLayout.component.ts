import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './MainLayout.component.html',
  styleUrls: ['./MainLayout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  sideBarOpen = true
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

}
