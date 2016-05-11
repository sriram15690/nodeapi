var page = require('webpage').create();
page.open('http://www.dbs.com.sg/personal/rates-online/foreign-currency-foreign-exchange.page', function(status) {
  // page.inject('jquery-1.12.3.js');
  if(status === "success") {
    page.render('dbs_currencies_page.png');
  }

  var price = page.evaluate(function(){
    return (100 / parseFloat(window.$("tr.filter_Indian_Rupee").find(".column-3").html())).toFixed(2);
  });
  // console.log(price);

  var updatedAt = page.evaluate(function(){
    return $("div.fxtitle .span12").text();
  }).replace(/\n/g,"").replace(/ /g, "").replace(/Last/g," Last");
  // console.log(updatedAt);

  var result = JSON.stringify({
      value: price,
      updatedAt: updatedAt
  });
  console.log(result);
  phantom.exit();
});