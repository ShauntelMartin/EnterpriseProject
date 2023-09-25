import express from "express";
import bodyParser from "body-parser";
import generateName from "sillyName";
import superheroes from "superheroes";
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const items = [];

function passwordCheck(username, password) {
  return password === "password" && username === "test";
}


function PressForRandomName(){
  var sillyName = generateName();
  const name = superheroes.random();
  const randomAdj = adj[Math.floor(Math.random() * adj.length)];
  const randomNoun = noun[Math.floor(Math.random() * noun.length)];
  
  fs.writeFile("message.txt", "Hello" + name + "you are" + randomNoun + "and" + randomAdj, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  
  fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

function generateQRAndSave(qrFileName, urlFileName) {
  inquirer
    .prompt([
      {
        message: "Type in your URL: ",
        name: "URL",
      },
    ])
    .then((answers) => {
      const url = answers.URL;
      const qr_svg = qr.image(url);
      qr_svg.pipe(fs.createWriteStream(qrFileName));

      fs.writeFile(urlFileName, url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

const adj = [
  "abandoned",
  "able",
  "absolute",
  "adorable",
  "adventurous",
  "academic",
  "acceptable",
  "acclaimed",
  "accomplished",
  "accurate",
  "aching"

];

const noun = [
  "aardvark",
  "abacus",
  "abbey",
  "abdomen",
  "abolishment",
  "abroad",
  "abyssinian",
  "accelerant",
  "accelerator"
];


app.get("/", (req, res) => {
  res.render("login.ejs", { items, name: "Login" });
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { items, name: "Work todo list" });
});

app.get("/today", (req, res) => {
  res.render("today.ejs", { items, name: "Today todo List" });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userIsAuthorised = passwordCheck(username, password);

  if (userIsAuthorised) 
  {
    res.status(200).redirect("/today").render("today.ejs");
  } else {
    res.status(401).send("<h1>Password incorrect</h1>");
  }
});

app.post("/addItem", (req, res) => {
  const newItem = req.body.newItem;
  if (newItem) {
    items.push(newItem);
  }
  res.redirect("/today");
});

app.post("/addItemWork", (req, res) => {
  const newItem = req.body.newItem;
  if (newItem) {
    items.push(newItem);
  }
  res.redirect("/work").send;
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
