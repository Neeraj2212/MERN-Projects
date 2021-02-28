import React from "react";
import { withRouter } from "react-router";

import {
	AppBar,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import auth from "./../auth/auth-helper";

const isActive = (history, path) => {
	if (history.location.pathname == path)
		return {
			borderBottom: `3px solid #ffffff`,
			color: "#ffffff",
		};
	else return { color: "#ffffff" };
};

const Menu = withRouter(({ history }) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography>MERN SKELETON</Typography>
				<Link to="/">
					<IconButton
						aria-label="Home"
						style={{ ...isActive(history, "/"), marginLeft: `10px` }}
					>
						<HomeIcon />
					</IconButton>
				</Link>
				<div style={{ marginLeft: `auto` }}>
					<Link to="/users">
						<Button style={isActive(history, "/users")}>Users</Button>
					</Link>
					{!auth.isAuthenticated() && (
						<span>
							<Link to="/signup">
								<Button style={isActive(history, "/signup")}> Sign Up </Button>
							</Link>
							<Link to="/signin">
								<Button style={isActive(history, "/signin")}> Sign In </Button>
							</Link>
						</span>
					)}
					{auth.isAuthenticated() && (
						<span>
							<Link to={"/user/" + auth.isAuthenticated().user._id}>
								<Button
									style={isActive(
										history,
										"/user/" + auth.isAuthenticated().user._id
									)}
								>
									My Profile
								</Button>
							</Link>
							<Button
								color="inherit"
								onClick={() => {
									auth.clearJWT(() => history.push("/"));
								}}
							>
								Sign out
							</Button>
						</span>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
});

export default Menu;
