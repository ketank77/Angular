import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }
  
  getDishes(): Promise<Dish[]> {
  // when we already have the data then we can use
  // return Promise.resolve(DISHES); but the actual use
  return new Promise (resolve => {
    setTimeout(() => resolve(DISHES), 1500);
  });
}

getDish(id: string): Promise<Dish> {
  return new Promise (resolve => {
    setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]),1500);
  });
}

getFeaturedDish(): Promise<Dish> {
  return new Promise (resolve => {
    setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]),1500);
  });
}

}
