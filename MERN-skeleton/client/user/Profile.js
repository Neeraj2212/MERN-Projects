import React, { useState, useEffect } from "react";
import auth from "./../auth/auth-helper";
import { read } from "./api-user";
import { Redirect, Link } from "react-router-dom";
import {
	makeStyles,
	Paper,
	Typography,
	List,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	Divider,
	ListItemText,
	Avatar,
} from "@material-ui/core";
import { Person, Edit } from "@material-ui/icons";
import DeleteUser from "./DeleteUser";
import theme from "./../theme";

const useStyles = makeStyles({
	root: theme.mixins.gutters({
		padding: theme.spacing(1),
		margin: theme.spacing(5),
		maxWidth: `600px`,

		textAlign: "center",
	}),
	title: {
		margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.openTitle,
	},
});

function Profile({ match }) {
	const [user, setUser] = useState({});
	const [redirectToSignin, setRedirectToSignin] = useState(false);
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const jwt = auth.isAuthenticated();
		read(
			{
				userId: match.params.userId,
			},
			{ t: jwt.token },
			signal
		).then((data) => {
			// console.log(data);
			if (data && data.error) {
				setRedirectToSignin(true);
			} else {
				setUser(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.userId]);

	if (redirectToSignin) {
		return <Redirect to="/signin" />;
	}

	const classes = useStyles();

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant="h4" className={classes.title}>
				Profile
			</Typography>
			<List dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<Person />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={user.name} secondary={user.email} />
					{auth.isAuthenticated().user &&
						auth.isAuthenticated().user._id == user._id && (
							<ListItemSecondaryAction>
								<Link to={"/user/edit/" + user._id}>
									<IconButton aria-label="Edit" color="primary">
										<Edit />
									</IconButton>
								</Link>
								<DeleteUser userId={user._id} />
							</ListItemSecondaryAction>
						)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary={"Joined: " + new Date(user.createdAt).toDateString()}
					/>
				</ListItem>
			</List>
		</Paper>
	);
}

export default Profile;
