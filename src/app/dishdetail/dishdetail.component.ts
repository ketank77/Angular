import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Dish } from "../shared/dish";
import { DishService } from '../services/dish.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {
    // we have to remove this input decorator as we will be using angular router
    //@Input()
    dishIds: string[];
    errMess : string;
    prev: string;
    next: string;
    dish : Dish;
    dishcopy: Dish;
    commentForm: FormGroup;
    comment: Comment;
    @ViewChild('cform') commentFormDirective;
    visibility = 'shown';

    formErrors = {
      'author': '',
      'comment': ''
    };
    validationMessages = {
      'author': {
        'required':
          'Name is required.',
        'minlength':
          'Name must be at least 2 characters long.'
      },
      'comment': {
        'required':
          'Comment is required.'
      },
    };

    constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder,
      @Inject('BaseURL') private BaseURL) { 
      }

      ngOnInit() {
        this.createForm();
        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']);}))
        .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown' },
        errmess => this.errMess = <any>errmess );
      }
    
      setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
      }
   goBack(): void {
      this.location.back();
   }

   createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, Validators.nullValidator],
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
   }

   onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
    // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
    }

    onSubmit() {
      this.comment = this.commentForm.value;
      console.log(this.comment);
      const date = new Date();
      this.comment.date = date.toString();
      this.dishcopy.comments.push(this.comment);
      this.dishservice.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => {this.dish = null, this.dishcopy = null, this.errMess = <any>errmess;});
      this.commentForm.reset({
        author: '', rating : 5, comment : ''
      });
      this.commentFormDirective.resetForm();
    }
}
