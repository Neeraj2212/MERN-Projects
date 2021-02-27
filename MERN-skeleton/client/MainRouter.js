import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";

const MainRouter = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/users" component={Users} />
				<Route path="/signup" component={Signup} />
			</Switch>
		</div>
	);
};

export default MainRouter;
