const Prince = require("prince");

Prince()
  .inputs("doc.html")
  .output("test.pdf")
  .option("page-margin", 0, true)
  // .option("page-size", "landscape", true)
  .execute()
  .then(
    function() {
      console.log("OK: done");
    },
    function(error) {
      console.log("ERROR: ", util.inspect(error));
    }
  );
