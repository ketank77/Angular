import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app-animation'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  disherrMess : string;
  promotionerrMess : string;
  leaderrMess : string;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe((dish) => this.dish = dish,
    errmess => this.disherrMess = <any>errmess )
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion,
    errmess => this.promotionerrMess = <any>errmess)
    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader,
    errmess => this.leaderrMess = <any>errmess)
  }

}
