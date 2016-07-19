/**
 * Created by michael.liu on 7/18/2016.
 */

// import StringValidator from './Validation';
import { StringValidator } from "./Validation";

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    console.log("++++>ZipCodeValidator");
    return s.length === 5 && numberRegexp.test(s);
  }
}
