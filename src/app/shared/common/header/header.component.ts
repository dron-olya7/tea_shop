import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  onSearch() {
    if (this.searchQuery) {

      this.route.navigate(['/catalog'], { queryParams: { search: this.searchQuery.trim() } });
    }
  }
  clearSearch() {
    this.searchQuery = '';
    this.route.navigate([], { queryParams: { search: null } });
  }
}
