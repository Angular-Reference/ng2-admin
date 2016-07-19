/**
 * Created by michael.liu on 7/18/2016.
 */

const numberRegexp = /^[0-9]+$/;

export default function (s: string) {
  console.log("export default function");
  return s.length === 5 && numberRegexp.test(s);
}
