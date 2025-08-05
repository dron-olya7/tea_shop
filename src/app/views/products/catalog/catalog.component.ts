import { TeaCatalogService } from 'src/app/shared/services/tea-catalog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeaCard } from 'src/app/shared/types/tea-card.type';

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  public teaCatalog: TeaCard[] = [];
  public isLoading: boolean = false;
  private subscriptionTeaCtalogService: Subscription | null = null;
  private subscriptionQuertParams: Subscription | null = null;
  filteredTeas: TeaCard[] = [];
  searchQuery: string = '';

  constructor(
      private TeaCatalogService: TeaCatalogService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadTeaCatalog();

    this.subscriptionQuertParams = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.filterTeas();
    });
  }

  loadTeaCatalog(): void {
    this.subscriptionTeaCtalogService = this.TeaCatalogService.getTeaCatalog()
        .subscribe({
          next: (data: TeaCard[]) => {
            this.teaCatalog = data;
            this.filterTeas();
            this.isLoading = false;
          },
          error: (error) => {
            this.router.navigate(['/'])
            console.error('Ошибка при получении каталога', error);
            this.isLoading = false;
          }
        });
  }

  filterTeas() {
    this.filteredTeas = this.searchQuery
        ? this.teaCatalog.filter(tea =>
            tea.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        : this.teaCatalog;
  }

  goToOrder(teaTitle: string) {
    this.router.navigate(['/order'], {
      queryParams: { tea: teaTitle }
    });
  }

  ngOnDestroy() {
    this.subscriptionTeaCtalogService?.unsubscribe();
    this.subscriptionQuertParams?.unsubscribe();
  }
}