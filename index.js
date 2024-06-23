import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// Convert `import.meta.url` to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const recipeJSON = '[{"id":"0001","type":"biriyani","name":"Chicken Biriyani","price":8.99,"ingredients":{"protein":{"name":"Chicken","preparation":"Marinated and Cooked"},"rice":{"name":"Basmati Rice","preparation":"Cooked with spices"},"toppings":[{"name":"Fried Onions","quantity":"1 cup"},{"name":"Boiled Egg","quantity":"1"},{"name":"Mint Leaves","quantity":"1/4 cup"},{"name":"Raita","quantity":"1 cup"}]}},{"id":"0002","type":"biriyani","name":"Beef Biriyani","price":9.49,"ingredients":{"protein":{"name":"Beef","preparation":"Marinated and Cooked"},"rice":{"name":"Basmati Rice","preparation":"Cooked with spices"},"toppings":[{"name":"Fried Onions","quantity":"1 cup"},{"name":"Boiled Egg","quantity":"1"},{"name":"Cilantro Leaves","quantity":"1/4 cup"},{"name":"Raita","quantity":"1 cup"}]}},{"id":"0003","type":"biriyani","name":"Fish Biriyani","price":10.99,"ingredients":{"protein":{"name":"Fish","preparation":"Marinated and Cooked"},"rice":{"name":"Basmati Rice","preparation":"Cooked with spices"},"toppings":[{"name":"Fried Onions","quantity":"1 cup"},{"name":"Boiled Egg","quantity":"1"},{"name":"Lemon Wedges","quantity":"4 pieces"},{"name":"Raita","quantity":"1 cup"}]}}]';

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { recipe: null });
});

app.post("/recipe", (req, res) => {
  const recipes = JSON.parse(recipeJSON);
  const choice = req.body.choice.toLowerCase();
  const recipe = recipes.find(r => r.name.toLowerCase().includes(choice));
  res.render("index", { recipe });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
