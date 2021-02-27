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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { create } from "./api-user";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./../theme";

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
		color: theme.palette.openTitle,
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

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		password: "",
		email: "",
		open: false,
		error: "",
	});

	const classes = useStyles();

	const clickSubmit = () => {
		const user = {
			name: values.name || undefined,
			password: values.password || undefined,
			email: values.email || undefined,
		};
		create(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, error: "", open: true });
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	return (
		<form autoComplete="off">
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<Typography variant="h4" className={classes.title}>
						Sign Up
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
					<DialogContentText>
						New account successfully created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to="/signin">
						<Button color="primary" autoFocus="autoFocus" variant="contained">
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</form>
	);
};

export default Signup;
