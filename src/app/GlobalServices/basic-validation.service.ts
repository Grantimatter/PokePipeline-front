import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/** I created this service class to encapsulate basic validation log. Null checking, undfined checking, and array checking.
 * I did this because of DRY.
 */
export class BasicValidationService {
  constructor() {}

  public isTruthyObject(object: Object): boolean {
    return object !== null && object !== undefined;
  }

  public isTruthyString(text: string) {
    return text !== null && text !== undefined && text !== null && text !== '';
  }
}
