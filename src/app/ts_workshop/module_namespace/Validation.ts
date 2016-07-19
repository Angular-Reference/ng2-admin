/**
 * Created by michael.liu on 7/18/2016.
 */


export const defaultRegexp = /^[2-9]+$/;

export interface StringValidator {
  isAcceptable(s: string): boolean;
}
