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
  `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
  `<h1>This is page 3</h1>`
];
const finalHtml = generateHtml(contentWithNumbering, pages);

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

function webShot(input) {
  const options = {
    windowSize: {
      width: 1024,
      height: 768
    },
    shotSize: {
      width: 3325,
      height: 2475
    },
    shotOffset: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    siteType: "file",
    streamType: "png",
    orientation: "portrait"
  };
  return new Promise((resolve, reject) => {
    webshot(input, "webshot.png", options, function(err) {
      if (err) reject(err);
      console.log("Generating screenshot.....");
      resolve();
    });
  });
}

function sharpBackBPage(input) {
  return (
    sharp(input)
      .extract({ left: 0, top: 0, width: 1629, height: 2475 }) //({ left: left, top: top, width: width, height: height })
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

function cropPage(input, left, top, width, height, output) {
  return (
    sharp(input)
      .extract({ left: left, top: top, width: width, height: height }) //({ left: left, top: top, width: width, height: height })
      // .resize(200,200)
      .toFile(`./output/${output}.png`)
      .then(() => {
        console.log(`Generating ${output}....`);
      })
      .catch(error => {
        console.log(output, error, "Stack : ", error.stack);
        throw error;
      })
  );
}

function sharpFrontPage(input) {
  return (
    sharp(input)
      .extract({ left: 1696, top: 0, width: 1629, height: 2475 }) //({ left: left, top: top, width: width, height: height })
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

function sharpSpinePage(input) {
  return (
    sharp(input)
      .extract({ left: 1629, top: 0, width: 67, height: 2475 }) //({ left: left, top: top, width: width, height: height })
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
      await webShot("./template2.html"); // takes screenshot
      await sharpFrontPage("./webshot.png"); // crop frontPage
      await sharpBackBPage("./webshot.png"); // crop BackPage
      await sharpSpinePage("./webshot.png"); // crop spinePage
      await princePdf(); // generate PDF
    } else {
      // HTML-PDF
      await princePdf(); //generate PDF
    }
  } catch (error) {}
}

generatePDF(config);
