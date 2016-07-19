/**
 * Created by michael.liu on 7/18/2016.
 */
// import { ZipCodeValidator , numberRegexp} from "./ZipCodeValidator";
// import * as validator from "./ZipCodeValidator";

import * as validator from "./AllValidators";

import "./my-module.js";

let myValidator = new validator.ZipCodeValidator();

myValidator.isAcceptable("abcde");

console.log("var 1: ", validator.numberRegexp);
console.log("var 2: ", validator.defaultRegexp);
 // console.log("var 3: ", MyModuleVar); //why compiler error


