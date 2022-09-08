import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Label, Input, Button } from "reactstrap";

function SignupForm({ signup }) {
	const navigate = useNavigate();
	const initialState = {
		username: "",
		password: "",
		email: "",
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

		let res = await signup(formData);

		if (res.success) {
			navigate("/", { replace: true });
		} else {
			alert("Error creating account");
		}
	}

	console.log(formData);

	return (
		<Form onSubmit={sendUserData}>
			<Label htmlFor='username'>Username</Label>
			<Input
				required
				type='text'
				onChange={handleChange}
				id='username'
				name='username'
				value={formData.username}
			/>
			<Label htmlFor='password'>Password</Label>
			<Input
				required
				onChange={handleChange}
				type='password'
				id='password'
				name='password'
				value={formData.password}
			/>
			<Label htmlFor='email'>Email</Label>
			<Input
				required
				onChange={handleChange}
				type='email'
				id='email'
				name='email'
				value={formData.email}
			/>
			<Button className='mt-2'>Signup</Button>
		</Form>
	);
}

export default SignupForm;
