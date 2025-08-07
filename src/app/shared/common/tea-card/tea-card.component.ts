import { Component, Input, OnInit } from '@angular/core';
import { TeaCard } from 'src/app/shared/types/tea-card.type';

@Component({
  selector: 'tea-card',
  templateUrl: './tea-card.component.html',
  styleUrls: ['./tea-card.component.scss']
})
export class TeaCardComponent implements OnInit {
  @Input() teaCard!: TeaCard;

  constructor(
  ) {

  }
  ngOnInit(): void {
  }

}
