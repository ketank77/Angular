import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
  // when we already have the data then we can use
  // return Promise.resolve(DISHES); but the actual use
    return new Promise (resolve => {
      setTimeout(() => resolve(LEADERS),1500);
    });
  }

  getLeader(id: string): Promise<Leader> {
    return new Promise (resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]),1500);
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise (resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]),1500);
    });
  }
}
