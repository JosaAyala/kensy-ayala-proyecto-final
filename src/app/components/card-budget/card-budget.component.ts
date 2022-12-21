import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Budget } from 'src/app/views/models/budget';

@Component({
  selector: 'app-card-budget',
  templateUrl: './card-budget.component.html',
  styleUrls: ['./card-budget.component.css'],
})
export class CardBudgetComponent implements OnInit {
  @Input() budget: Budget = new Budget();
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSaveChanges: EventEmitter<any> = new EventEmitter<any>();

  isEditing: boolean = false; 

  constructor() {}

  ngOnInit(): void {}

  editBudget() {
    this.isEditing = true;
  }

  cancel() {
    this.isEditing = false;
  }

  removeBudget() {
    this.onRemove.emit(this.budget.id);
  }

  saveBudget() {
    this.isEditing = false;
    this.onSaveChanges.emit(this.budget);
  }
}
