'use strict';

let fs = require("fs")
let mold = new (require("mold-template"))();

let posts = [];
for(let fileName of process.argv.slice(2)) {
    let dateRaw = /^[^\.]+\/(\d{4}_\d{2}_\d{2})_[^\.]+/.exec(fileName)[1];
    // let titleRaw = /^[^\.]+\/\d{4}_\d{2}_\d{2}_([^\.]+)/.exec(fileName)[1];
    posts.push({
        date: parsePubDate(dateRaw),
        title: parseTitle(fileName),
        category: /^([^\.]+)\/\d{4}_\d{2}_\d{2}_[^\.]+/.exec(fileName)[1],
        link: `${fileName}.html`
    });
}

let feedFile = fs.readFileSync(__dirname + `/feed_template.xml`, "utf8");
let template = mold.bake("feed", feedFile);

let metadata = {
    posts
};

console.log(template(metadata));

function parseTitle(fileName){
    let htmlFile = fs.readFileSync(`${__dirname}/../html/${fileName}.html`, 'utf-8');
    let title = /span>(.*)<\/h1>/.exec(htmlFile)[1];
    // let imageCaptures = /<img src="(.*)"/.exec(htmlFile);
    return title;
}

function parsePubDate(dateRaw){
    // Wed, 02 Oct 2002 13:00:00 GMT
    let dateOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "utc",
        timeZoneName: "short",
    };
      
    let year = parseInt(dateRaw.slice(0, 4));
    let month = parseInt(dateRaw.slice(5, 7)) - 1;
    let day = parseInt(dateRaw.slice(9));

    // just set pub time to 9AM local
    let date = new Date(year, month, day, 9);
    let dateTimeString = date.toLocaleDateString("en-US", dateOptions).replace(/,/g, '');
    return `${dateTimeString.slice(0,3)}, ${dateTimeString.slice(8,10)} ${dateTimeString.slice(4,7)} ${dateTimeString.slice(11, -3)}GMT`;
}


  
  