const experss = require("express");
const app = experss();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		port: 5432,
		user: "postgres",
		password: "test",
		database: "smart-brain",
	},
});

app.use(experss.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("success");
});

app.post("/signin", (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
	image.handleImage(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
