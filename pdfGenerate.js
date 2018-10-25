const webshot = require("webshot");
const sharp = require("sharp");
const Prince = require("prince");
const fs = require("fs");
let content = `<style> hr {} @page { size: A4; prince-shrink-to-fit: auto; @bottom { content: "Page " counter(page) " of " counter(pages) } } img { page: image; display: block; }  } @page content{ size: A4; prince-shrink-to-fit: auto; @bottom { content: counter(page) }}  #seprate{page: content; page-break-after: always } </style>`;
let contentWithNumbering = `<style> hr {} @page { size: A4; prince-shrink-to-fit: auto; @bottom { content:  counter(page) } } img { page: image; display: block; }  } @page content{ size: A4; prince-shrink-to-fit: auto; @bottom { content: counter(page) }}  #seprate{page: content; page-break-after: always } </style>`; // with 

const config = { type: "cover" };
const pages = [
  ` <img src="./output/front-page.png"  alt="">`,
  `<img src="./output/spine.png"  alt="">`,
  `<img src="./output/back-page.png"  alt="">`,
  `<h1>Hello this new page</h1>`,
  `<h1>This is page 3</h1>`
];
const finalHtml = generateHtml(contentWithNumber, pages);

function generateHtml(content, newPage) {
  newPage.map(element => {
    content += `<div id="seprate"> ${element}</div>`;
  });
  return content;
}

function princePdf() {
  fs.writeFile(`cover.html`, finalHtml, err => {
    if (err) reject(err);
    Prince()
      .inputs("cover.html")
      .output("./output/cover.pdf")
      .option("page-margin", 10, true)
      // .option("page-size", "landscape", true)
      .execute()
      .then(() => {
        console.log("Awesome PDF generated :)  ");
        fs.unlink("cover.html");
        return;
      })
      .catch(error => {
        console.log("ERROR: ", util.inspect(error));
        throw error;
      });
  });
}

function webShot() {
  const options = {
    windowSize: {
      width: 1024,
      height: 768
    },
    shotSize: {
      width: 3325,
      height: 2475
    },
    siteType: "file",
    streamType: "png",
    orientation: "portrait"
  };
  return new Promise((resolve, reject) => {
    webshot("test.html", "webshot.png", options, function(err) {
      if (err) reject(err);
      console.log("Generating screenshot.....");
      resolve();
    });
  });
}

function sharpBackBPage() {
  return (
    sharp("./webshot.png")
      .extract({ left: 0, top: 0, width: 1664, height: 2475 }) //({ left: left, top: top, width: width, height: height })
      // .resize(200,200)
      .toFile("./output/back-page.png")
      .then(() => {
        console.log("Generating back page....");
      })
      .catch(error => {
        console.log("backPage", error, "Stack : ", error.stack);
        throw error;
      })
  );
}

function sharpFrontPage() {
  return (
    sharp("./webshot.png")
      .extract({ left: 1730, top: 0, width: 1595, height: 2475 }) //({ left: left, top: top, width: width, height: height })
      // .resize(200,200)
      .toFile("./output/front-page.png")
      .then(() => {
        console.log("Generating front page...");
      })
      .catch(error => {
        console.log("frontPage", error, "Stack : ", error.stack);
        throw error;
      })
  );
}

function sharpSpinePage() {
  return (
    sharp("./webshot.png")
      .extract({ left: 1664, top: 0, width: 66, height: 2475 }) //({ left: left, top: top, width: width, height: height })
      // .resize(200,200)
      .toFile("./output/spine.png")
      .then(() => {
        console.log("Generating Spine page...");
      })
      .catch(error => {
        console.log("SpinePage", error, "Stack : ", error.stack);
        throw error;
      })
  );
}

async function generatePDF(config) {
  try {
    if (config.type === "cover") {
      // HTML_PNG-PDF
      await webShot(); // takes screenshot
      await sharpFrontPage(); // crop frontPage
      await sharpBackBPage(); // crop BackPage
      await sharpSpinePage(); // crop spinePage
      await princePdf(); // generate PDF
    } else {
      // HTML-PDF
      await princePdf(); //generate PDF
    }
  } catch (error) {}
}

generatePDF(config);
