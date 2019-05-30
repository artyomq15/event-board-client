import { FormGroup } from '@angular/forms';

export function validateTime(group: FormGroup) {
    let from = group.controls.timeFrom.value;
    let to = group.controls.timeTo.value;

    if ( from && to) {
      from = new Date(from).getTime();
      to = new Date(to).getTime();
      if (from >= to) {
        return {validTime: true};
      }
      return null;
    }
}
