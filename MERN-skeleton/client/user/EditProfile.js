import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	Typography,
	DialogContent,
	TextField,
	CardActions,
	Icon,
	Dialog,
	DialogTitle,
	Button,
	DialogContentText,
	Divider,
	DialogActions,
} from "@material-ui/core";

import red from "@material-ui/core/colors/red";

import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import theme from "./../theme";
import auth from "./../auth/auth-helper";
import { read, update } from "./api-user";

const useStyles = makeStyles({
	card: {
		maxWidth: 600,
		margin: "auto",
		textAlign: "center",
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
	},
	error: {
		verticalAlign: "middle",
	},
	title: {
		marginTop: theme.spacing(2),
		color: red[500],
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		maxWidth: 400,
	},
	submit: {
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
	cardContent: {
		display: `flex`,
		justifyContent: `center`,
		alignItems: `center`,
		flexDirection: "column",
	},
});

const EditProfile = ({ match }) => {
	const [values, setValues] = useState({
		name: "",
		password: "",
		email: "",
		open: false,
		error: "",
	});

	const jwt = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		read(
			{
				userId: match.params.userId,
			},
			{ t: jwt.token },
			signal
		).then((data) => {
			// console.log(data);
			if (data && data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, name: data.name, email: data.email });
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.userId]);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const clickSubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			password: values.password || undefined,
		};
		update(
			{ userId: match.params.userId },
			{
				t: jwt.token,
			},
			user
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, userId: data._id, open: true });
			}
		});
	};

	if (values.redirectToProfile) {
		<Redirect to={"/user/" + values.userId} />;
	}
	const classes = useStyles();
	return (
		<div>
			<form autoComplete="off">
				<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
						<Typography variant="h4" className={classes.title}>
							Edit Profile
						</Typography>

						<TextField
							id="name"
							className={classes.textField}
							label="Name"
							value={values.name}
							variant="outlined"
							onChange={handleChange("name")}
							fullWidth
							margin="normal"
						/>

						<TextField
							id="email"
							className={classes.textField}
							type="email"
							label="Email"
							value={values.email}
							fullWidth
							onChange={handleChange("email")}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							className={classes.textField}
							id="password"
							fullWidth
							type="password"
							label="Password"
							value={values.password}
							onChange={handleChange("password")}
							variant="outlined"
							margin="normal"
						/>
						{values.error && (
							<Typography component="p" color="error">
								<Icon color="error">error</Icon>
								{values.error}
							</Typography>
						)}
					</CardContent>
					<CardActions>
						<Button
							color="primary"
							variant="contained"
							onClick={clickSubmit}
							className={classes.submit}
						>
							Submit
						</Button>
					</CardActions>
				</Card>
				<Dialog open={values.open} disableBackdropClick={true}>
					<DialogTitle>New Account</DialogTitle>
					<Divider />
					<DialogContent>
						<DialogContentText>Profile Updated Successfully.</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Link to={"/user/" + match.params.userId}>
							<Button color="primary" autoFocus="autoFocus" variant="contained">
								Profile
							</Button>
						</Link>
					</DialogActions>
				</Dialog>
			</form>
		</div>
	);
};

export default EditProfile;
