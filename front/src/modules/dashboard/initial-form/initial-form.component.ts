import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.less']
})
export class InitialFormComponent implements OnInit {
  @Output() initialData = new EventEmitter();
  firstStep: FormGroup;
  secondStep: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get categories(): FormArray {
    return <FormArray>this.secondStep.controls.categories;
  }

  ngOnInit() {
    this.firstStep = this.formBuilder.group({
      payment: ['', Validators.required]
    });
    this.secondStep = this.formBuilder.group({
      categories: this.formBuilder.array([])
    });

    this.addNewCompany();
  }

  deleteCategory(i: number) {
    this.categories.removeAt(i);
  }

  addNewCompany() {
    this.categories.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        percent: ['', Validators.required]
      })
    )
  }

  complete() {
    this.initialData.next({
      payment: this.firstStep.getRawValue().payment,
      categories: this.secondStep.getRawValue().categories
    });
  }
}
