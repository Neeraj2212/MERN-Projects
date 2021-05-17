import app from "./express";
import config from "./../config/config";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose
	.connect(config.mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log("Database connected successfully"))
	.catch((err) => console.log(err));

mongoose.connection.on("error", () => {
	throw new Error(`unable to connect to database `);
});

app.listen(config.port, (err) => {
	if (err) {
		console.log(err);
	}
	console.info("Server started on port %s.", config.port);
});
