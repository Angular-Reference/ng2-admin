/**
 * Created by michael.liu on 7/18/2016.
 */

/// <reference path="../../../typings/globals/jquery/index.d.ts" />

$.getJSON("example2.json",function (data) {
  console.log(data);

})


$.getJSON("example2.json",(data) => {console.log(data);});
