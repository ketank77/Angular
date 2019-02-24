import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise (resolve => {
      setTimeout(() => resolve(PROMOTIONS), 1500);
    });
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise (resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),1500);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise (resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 1500);
    });
  }
}
