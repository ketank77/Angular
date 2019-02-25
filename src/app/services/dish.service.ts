import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }
  
  getDishes(): Observable<Dish[]> {
  // when we already have the data then we can use
  // return Promise.resolve(DISHES); but the actual use

  //we will also change the belwo as we will now be using observable
  //return new Promise (resolve => {
  //  setTimeout(() => resolve(DISHES), 1500);});
      return of(DISHES).pipe(delay(2000));
  }

getDish(id: string): Observable<Dish> {
  return of (DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
}

getFeaturedDish(): Observable<Dish> {
  return of (DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
}

getDishIds(): Observable<string[] | any> {
  return of(DISHES.map(dish => dish.id ));
}

}
