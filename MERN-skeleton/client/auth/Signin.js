import React, { useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	TextField,
	CardActions,
	Icon,
	Button,
} from "@material-ui/core";
import { Redirect } from "react-router";
import { signin } from "./api-auth";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./../theme";
import auth from "./auth-helper";

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

const Signin = (props) => {
	const classes = useStyles();

	const [values, setValues] = useState({
		password: "",
		email: "",
		redirectToReferrer: false,
		error: "",
	});

	const clickSubmit = () => {
		const user = {
			password: values.password || undefined,
			email: values.email || undefined,
		};
		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				auth.authenticate(data, () => {
					setValues({ ...values, error: "", redirectToReferrer: true });
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const { from } = props.location.state || {
		from: {
			pathname: "/",
		},
	};

	const { redirectToReferrer } = values;
	if (redirectToReferrer) {
		return <Redirect to={from} />;
	}

	return (
		<form>
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<Typography variant="h4" className={classes.title}>
						Sign In
					</Typography>

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
		</form>
	);
};

export default Signin;
