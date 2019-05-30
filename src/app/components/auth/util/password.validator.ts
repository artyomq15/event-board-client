import { FormGroup } from '@angular/forms';

export function validatePasswordConfirmation(group: FormGroup) {
    const password = group.controls.password.value;
    const confirmation = group.controls.passwordConfirm.value;

    if (password && confirmation && (password === confirmation)) {
      return null;
    }
    return { confirm: true };
}
