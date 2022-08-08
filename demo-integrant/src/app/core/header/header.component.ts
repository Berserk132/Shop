import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  foods: string[] = ['ahmed', 'sayed', 'ibrahim']
  constructor(public accountService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  Logout() {

    this.router.navigate(['/login']);
  }

}
