#!/usr/bin/env node
/**
*  Cek Resi CLI
*  (c) 2016 Ipan Ardian
*
*  A command line app to check tracking number 
*  For details, see the web site: https://github.com/ipanardian/cekresi-cli
*  Apache License 2.0
*/

if (process.argv.length <= 2) {
    console.log("Usage: cekresi-cli NOMOR_RESI");
    process.exit(-1);
}

var Horseman = require('node-horseman');
var cheerio = require('cheerio');
var tabletojson = require('tabletojson');
var param = process.argv[2];
 
console.log('Checking Nomor Resi: ' + param);
var horseman = new Horseman();
	horseman
	.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.3")
	.open('http://cekresi.com/?noresi='+param)
	.click("#cekresi")
	.waitForSelector('#results table')
	.evaluate(function() {
		return document.querySelector('#results').innerHTML;
	})
	.then(function(result){
		var $ = cheerio.load(result)
		var trackingStatus = $("td:contains('JNE Status')").next().next().text()
		console.log("Status: " +trackingStatus)
		console.log('Detail:')
		var tablesAsJson = tabletojson.convert(result)
		console.log(tablesAsJson)
		console.log('\nFor details: https://github.com/ipanardian/cekresi-cli')
		return horseman.close();
	});