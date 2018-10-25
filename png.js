const webshot = require("webshot");
const sharp = require("sharp");

async function webShot() {
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
    streamType: "png"
  };

  try {
    await webshot("test.html", "webshot.png", options, function(err) {
      if (err) console.log(err);
      console.log("Generating screenshot.....");

      // screenshot now saved to hello_world.png
    });
  } catch (error) {
    throw error;
  }
}

async function sharpBackBPage() {
  try {
    await sharp("webshot.png")
      .extract({ left: 0, top: 0, width: 1664, height: 2475 }) //({ left: left, top: top, width: width, height: height })
      // .resize(200,200)
      .toFile("./output/back-page.png")
      .then(() => {
        console.log("Generating back page....");
      });
  } catch (error) { throw error}
}
async function sharpFrontPage() {
  try {
    await sharp("webshot.png")
      .extract({ left: 1730, top: 0, width: 1595, height: 2475 }) //({ left: left, top: top, width: width, height: height })
      // .resize(200,200)
      .toFile("./output/front-page.png")
      .then(() => {
        console.log("Generating front page...");
      });
  } catch (error) { throw error}
}
async function sharpSpinePage() {
  try {
    await sharp("webshot.png")
      .extract({ left: 1664, top: 0, width: 66, height: 2475 }) //({ left: left, top: top, width: width, height: height })
      // .resize(200,200)
      .toFile("./output/spine.png")
      .then(() => {
        console.log("Generating Spine page");
      });
  } catch (error) {}
}






// async function generate() {
//   const options = {
//     windowSize: {
//       width: 1024,
//       height: 768
//     },
//     shotSize: {
//       width: "all",
//       height: "all"
//     },
//     siteType: "file",
//     streamType: "png"
//   };

//   try {
//     await webshot("test.html", "webshot.png", options, function(err) {
//       if (err) console.log(err);
//       console.log("Generating screenshot.....");
//     });
//     await sharp("webshot.png")
//       .extract({ left: 0, top: 0, width: 1664, height: 2475 }) //({ left: left, top: top, width: width, height: height })
//       // .resize(200,200)
//       .toFile("./output/back-page.png")
//       .then(() => {
//         console.log("Generating back page....");
//       });
//     await sharp("webshot.png")
//       .extract({ left: 1730, top: 0, width: 1595, height: 2475 }) //({ left: left, top: top, width: width, height: height })
//       // .resize(200,200)
//       .toFile("./output/front-page.png")
//       .then(() => {
//         console.log("Generating front page...");
//       });
//     await sharp("webshot.png")
//       .extract({ left: 1664, top: 0, width: 66, height: 2475 }) //({ left: left, top: top, width: width, height: height })
//       // .resize(200,200)
//       .toFile("./output/spine.png")
//       .then(() => {
//         console.log("Generating Spine page");
//       });
//   } catch (error) {
//     throw error;
//   }
// }

// webShot();
sharpFrontPage();
sharpBackBPage();
sharpSpinePage();
/**
 * PDf values
 * 
 * 
 * spine left 1664 top 0 width 66 hg 2475

front left 1730 top:0 width: 1595 hg 2475\

back left 0 top 0 width 1664 hg 2475  
 * 
 * 
 */
