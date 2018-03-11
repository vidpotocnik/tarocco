import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import { Step } from '../../models/step';

@Injectable()
export class StepperService {

  public getSteps(): Array<Step> {
    return [
      Step.init({
        stepId: 1,
        stepName: 'Podatki o ekipi',
        active: true,
        passed: true
      }),
      Step.init( {
        stepId: 2,
        stepName: 'Dostopni ključ',
        active: false,
        passed: false
      }),
      Step.init(
        {
          stepId: 3,
          stepName: 'Zaključek',
          active: false,
          passed: false
        })
    ];
  }
}
