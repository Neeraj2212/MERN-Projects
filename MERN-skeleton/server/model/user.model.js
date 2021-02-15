import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: "Name is required",
		},
		email: {
			type: String,
			trim: true,
			unique: "Email already exists",
			match: [/.+\@.+\..+/, "Please fill a valid email address"],
			required: "Email is required",
		},
		password: {
			type: String,
			required: "Password is required",
		},
	},
	{ timestamps: true }
);

UserSchema.path("password").validate(function (v) {
	if (this.password && this.password.length < 6) {
		this.invalidate("password", "Password must be at least 6 characters.");
	}
	if (this.isNew && !this.password) {
		this.invalidate("password", "Password is required");
	}
}, null);

UserSchema.methods = {
	authenticate: async function (plainText) {
		try {
			// console.log(plainText);
			let result = await bcrypt.compare(plainText, this.password);
			// console.log(result);
			return result;
		} catch (error) {
			console.log(error.message);
			return false;
		}
	},
	encryptPassword: async function (password) {
		if (!password) return "";

		try {
			let hash = await bcrypt.hash(password, 10);
			return hash;
		} catch (error) {
			console.log(error);
			return "";
		}
	},
};

UserSchema.pre("save", async function (next) {
	this.password = await this.encryptPassword(this.password);
	next();
});

export default mongoose.model("User", UserSchema);
