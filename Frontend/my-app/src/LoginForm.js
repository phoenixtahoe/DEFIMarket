import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";

function LoginForm({ login }) {
	const navigate = useNavigate();

	const initialState = {
		username: "",
		password: "",
	};

	const [formData, setFormData] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	async function sendUserData(e) {
		e.preventDefault();

		let res = await login(formData);

		if (res.success) {
			navigate("/", { replace: true });
		} else {
			alert("Error Logging in!");
		}
	}

	return (
		<Form onSubmit={sendUserData}>
			<FormGroup>
				<Label htmlFor='username'>Username</Label>
				<Input
					required
					type='text'
					onChange={handleChange}
					id='username'
					name='username'
					value={formData.username}
				/>
			</FormGroup>
			<FormGroup>
				<Label htmlFor='password'>Password</Label>
				<Input
					required
					onChange={handleChange}
					type='password'
					id='password'
					name='password'
					value={formData.password}
				/>
			</FormGroup>
			<Button className='mt-2'>Login</Button>
		</Form>
	);
}

export default LoginForm;
