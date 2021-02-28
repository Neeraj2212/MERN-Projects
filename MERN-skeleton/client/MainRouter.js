import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import Signin from "./auth/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import EditProfile from "./user/EditProfile";

const MainRouter = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/users" component={Users} />
				<Route path="/signup" component={Signup} />
				<Route path="/signin" component={Signin} />
				<PrivateRoute path="/user/edit/:userId" component={EditProfile} />
				<Route path="/user/:userId" component={Profile} />{" "}
			</Switch>
		</div>
	);
};

export default MainRouter;
