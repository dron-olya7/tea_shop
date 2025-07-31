import { Injectable } from '@angular/core';
import { TeaCard } from '../types/tea-card.type';

@Injectable()
export class TeaDataService {
  private teaCard: TeaCard | null = null;
  constructor() { }
  setTeaCard(teaCard: TeaCard) {
    this.teaCard = teaCard;
  }
  getTeaCard(): TeaCard | null {
    return this.teaCard;
  }
}
