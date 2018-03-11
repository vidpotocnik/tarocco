import { Component, OnInit } from '@angular/core';
import { Step } from '../../../core/models/step';
import { StepperService } from '../../../core/services/render/stepper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public steps: Array<Step>;
  public currentStep: Step;


  constructor(public stepperService: StepperService) { }

  ngOnInit() {
    this.steps = this.stepperService.getSteps();
    this.initFirstStep();
  }

  public initFirstStep(): void {
    if (this.steps.length === 0) {
      return;
    }
    this.currentStep = this.steps[0];
  }

  public nextStep(): void {
    let changed = false;
    this.steps.forEach((s, index) => {
      if (!changed && s.active && index <= this.steps.length - 2) {
        this.steps[index + 1].active = true;
        this.steps[index + 1].passed = true;
        s.active = false;
        this.currentStep = this.steps[index + 1];
        changed = true;
      }
    });
  }

  public lastStep(): void {
    this.steps.forEach((s, index) => {
      if (s.active && index >= 1) {
        this.steps[index - 1].active = true;
        this.currentStep = this.steps[index - 1];
        s.active = false;
        s.passed = false;
      }
    });
  }

}
