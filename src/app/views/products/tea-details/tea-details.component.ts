import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaCatalogService } from 'src/app/shared/services/tea-catalog.service';
import { TeaDataService } from 'src/app/shared/services/tea-data.service';
import { TeaCard } from 'src/app/shared/types/tea-card.type';

@Component({
  selector: 'tea-details',
  templateUrl: './tea-details.component.html',
  styleUrls: ['./tea-details.component.scss']
})
export class TeaDetailsComponent implements OnInit {
  public isLoading: boolean = false;
  teaCard: TeaCard;

  constructor(private teaCatalogService: TeaCatalogService,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private teaDataService: TeaDataService
  ) {

    this.teaCard = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.activateRoute.params.subscribe((params) => {
      if (params['id']) {

        this.teaCatalogService.getTeaDetails(+params['id'])
          .subscribe({
            next: (data => {
              this.teaCard = data;
              this.teaDataService.setTeaCard(this.teaCard);
              this.isLoading = false;
            }),
            error: (error) => {
              this.route.navigate(['/'])
            }
          })

      }
    })

  }

}
