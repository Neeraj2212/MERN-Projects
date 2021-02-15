import User from "../model/user.model";
import extend from "lodash/extend";
import errorHandler from "./error.controller";

const create = async (req, res, next) => {
	const user = new User(req.body);
	try {
		await user.save();
		return res.status(200).json({
			message: "Successfully signed up!",
		});
	} catch (err) {
		return res.status(400).json({
			err,
			// error: errorHandler.getErrorMessage(err),
		});
	}
};
const list = async (req, res) => {
	try {
		let users = await User.find().select("name email updatedAt createdAt");
		res.json(users);
	} catch (err) {
		return res.status(400).json({
			err,
			// error: errorHandler.getErrorMessage(err),
		});
	}
};
const userByID = async (req, res, next, id) => {
	try {
		let user = await User.findById(id);
		if (!user) {
			res.status(400).json({
				error: "User not found",
			});
		}
		req.profile = user;
		next();
	} catch (err) {
		return res.status("400").json({
			error: "Could not retrieve user",
		});
	}
};

const read = (req, res) => {
	req.profile.password = undefined;
	console.log(req.profile);
	return res.json(req.profile);
};

const update = async (req, res) => {
	try {
		let user = req.profile;
		user = extend(user, req.body);
		await user.save();
		user.password = undefined;
		res.json(user);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const remove = async (req, res) => {
	try {
		let user = req.profile;
		let deletedUser = await user.remove();
		deletedUser.password = undefined;
		res.json(deletedUser);
	} catch (err) {
		return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
	}
};

export default { create, userByID, read, list, remove, update };
