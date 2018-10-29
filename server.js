const express = require("express"),
  app = express(),
  PORT = 2080,
  axios = require("axios"),
  handlebars = require("handlebars"),
  draft_url =
    "http://dev.authorify.com/afy-api-demo/draft?draft_id=5bd2ccd898778c6de06507f9";
const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    foo: function() {
      return "FOO!";
    },
    extname: ".hbs",
    compare: function(lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

      var operator = options.hash.operator || "==";

      var operators = {
        "==": function(l, r) {
          return l == r;
        },
        "===": function(l, r) {
          return l === r;
        },
        "!=": function(l, r) {
          return l != r;
        },
        "<": function(l, r) {
          return l < r;
        },
        ">": function(l, r) {
          return l > r;
        },
        "<=": function(l, r) {
          return l <= r;
        },
        ">=": function(l, r) {
          return l >= r;
        },
        typeof: function(l, r) {
          return typeof l == r;
        }
      };

      if (!operators[operator])
        throw new Error(
          "Handlerbars Helper 'compare' doesn't know the operator " + operator
        );

      var result = operators[operator](lvalue, rvalue);

      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    log: function(something) {
      console.log(something);
    }
  }
});

// axios request to get drafts
function getDraftData() {
  return axios
    .get(draft_url)
    .then(result => {
      return result.data.data.results;
    })
    .catch(err => {
      console.log(err.message);
      throw err;
    });
}

app.set("views", "./views");
app.engine(".hbs", hbs.engine); // <===== Use `hbs.engine`
app.set("view engine", ".hbs");
async function generateHTML() {
  return await getDraftData();
}

app.get("/", (req, res) => {
  generateHTML().then(result => {
    res.render("index", { sections: result.sections });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
