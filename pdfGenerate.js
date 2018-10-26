const webshot = require("webshot");
const sharp = require("sharp");
const Prince = require("prince");
const fs = require("fs");
let content = `<style> #Panes h1 { font-size: 48px; line-height: 48px; } #Panes p {font-size: 18px; line-height: 24px;} hr {} @page { size: A4; prince-shrink-to-fit: auto;  } img { page: image; display: block; }  } @page content{ size: A4; prince-shrink-to-fit: auto; @bottom { content: counter(page) }}  #seprate{page: content; page-break-after: always } </style>`;
let contentWithNumbering = `<style> hr {} @page { size: A4; prince-shrink-to-fit: auto; @bottom { content:  counter(page) } } img { page: image; display: block; }  } @page content{ size: A4; prince-shrink-to-fit: auto; @bottom { content: counter(page) }}  #seprate{page: content; page-break-after: always } </style>`; // with

const config = { type: "cover" };
const pages = [
  ` <img src="./output/front-page.png"  alt="">`,
  `<img src="./output/spine.png"  alt="">`,
  `<img src="./output/back-page.png"  alt="">`,
  `<html> <head> <style> #Panes h1{ font-size: 56px} h2 { font-size: 48px; line-height: 48px; } #Panes p { font-size: 18px; line-height: 24px; } </style> </head> <div id="Panes"> <div> <h1 align= "center">Intro</h1> <h1 style=" font-size: 48px; line-height: 48px; ">What is Lorem Ipsum?</h1> <p style=" font-size: 34px; line-height: 40px; "><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> </div> <div> <h1 style=" font-size: 48px; line-height: 48px; ">Why do we use it?</h1> <p style=" font-size: 34px; line-height: 40px; ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p> </div><br> <div> <h1 style=" font-size: 48px; line-height: 48px; ">Where does it come from?</h1> <p style=" font-size: 34px; line-height: 40px; ">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p> <p style=" font-size: 34px; line-height: 40px; ">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p> </div> <div> <h1 style=" font-size: 48px; line-height: 48px; ">Where can I get some?</h1> <p style=" font-size: 34px; line-height: 40px; ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p> </div> </div> </html>`,
  `<html> <head> <style> #Panes h1{ font-size: 56px} h2 { font-size: 48px; line-height: 48px; } #Panes p { font-size: 18px; line-height: 24px; } </style> </head> <div id="Panes"> <div> <h1 align= "center">Foreword</h1> <h1 style=" font-size: 48px; line-height: 48px; ">What is Lorem Ipsum?</h1> <p style=" font-size: 34px; line-height: 40px; "><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> </div> <div> <h1 style=" font-size: 48px; line-height: 48px; ">Why do we use it?</h1> <p style=" font-size: 34px; line-height: 40px; ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p> </div><br> <div> <h1 style=" font-size: 48px; line-height: 48px; ">Where does it come from?</h1> <p style=" font-size: 34px; line-height: 40px; ">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p> <p style=" font-size: 34px; line-height: 40px; ">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p> </div> <div> <h1 style=" font-size: 48px; line-height: 48px; ">Where can I get some?</h1> <p style=" font-size: 34px; line-height: 40px; ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p> </div> </div> </html>`
];
const finalHtml = generateHtml(content, pages);

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
      // CHANGE TEM
      await webShot("./templates/template1.html"); // takes screenshot
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
