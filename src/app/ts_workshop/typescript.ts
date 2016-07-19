
/**
 * Created by michael.liu on 7/15/2016.
 */

/**
 * compile and run typescript
 * npm install -g node-ts
 * node-ts typescript.ts
 *
 * run javascript:
 * node javascript.js
 */

interface Foo{
  x:number,
  y:number
}

let foo = {} as Foo;
foo.x = 1;
foo.y = 2;

let foo2:Foo = {
  x : 1,
  y : 2016
}

console.log(foo.x);
console.log(foo2.y);


//type alias
type StrOrNum = string|number;
let str: StrOrNum;
str = 1;
str = 'str';
// let notStrAndNum: StrOrNum = false; //compile error


//tuple type
var nameNumber : [string, number];
nameNumber = ['hello',123];
// nameNumber = ['hello','123']; //compile error
//destruction
var [name, num] = nameNumber;
console.log(name,num);


//union type
function unionTypeFun(someArg: string[]|string):string
{
  let rtnVal:string;
  if(typeof someArg === 'string')
  {
    rtnVal = someArg.trim();
  }
  else
    rtnVal = someArg.join(",").trim();

  return rtnVal;
}

console.log(unionTypeFun(['yes','no','is','question']));
console.log(unionTypeFun('yes or no is another question'));



//interface and inline type annotation
namespace ifcInline {
  interface Name {
    first:string,
    last:string
  }

  let name:Name;
  name = {first: 'michael', last: 'liu'};

  console.log(name.first);

  //inline
  let name2 : {first:string, last:string};
  name2 = {first: 'michael2', last: 'liu2'};
  console.log(name2.first);
}

//declare
declare var dfoo:any;
dfoo = 123;
console.log(dfoo);



//modify native types
//https://basarat.gitbooks.io/typescript/content/docs/tips/globals.md
//We even recommend creating a special file called  globals.d.ts  for this purpose.
interface Console {
  log2():void;
};
console.log("log");
console.log2 = () => console.log('log2');
console.log2();


// variable annotation
var sampleVariable: { bar: number };
sampleVariable.bar = 2;
function foo(sampleParameter: { bar: number }) { };
foo(2);

