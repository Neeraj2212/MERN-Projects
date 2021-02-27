import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Paper,
	Typography,
	IconButton,
} from "@material-ui/core";
import { ArrowForward, Person } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { list } from "./api-user";

const useStyles = makeStyles((theme) => ({
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
}));

function Users() {
	const [users, setUsers] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		list(signal).then((data) => {
			if (data && data.error) console.log(data.error);
			else setUsers(data);
		});

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant="h4" className={classes.title}>
				All Users
			</Typography>
			<List dense>
				{users.map((item) => {
					return (
						<Link
							to={"/user/" + item._id}
							key={item._id}
							style={{ color: `black` }}
						>
							<ListItem button>
								<ListItemAvatar>
									<Avatar>
										<Person />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={item.name} />
								<IconButton>
									<ArrowForward />
								</IconButton>
							</ListItem>
						</Link>
					);
				})}
			</List>
		</Paper>
	);
}

export default Users;
