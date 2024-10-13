"use client";
import React from "react";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ error, ...rest }) => {
	const [type, setType] = useState("password");

	const handleClick = () => {
		setType((prev) => (prev === "password" ? "text" : "password"));
	};

	return (
		<InputGroup className="mb-3">
			<Form.Control
				placeholder=""
				aria-label="Password"
				aria-describedby="password"
				type={type}
				{...rest}
				isInvalid={!!error}
			/>
			<InputGroup.Text
				id="password"
				style={{ cursor: "pointer" }}
				onClick={handleClick}
			>
				{type === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
			</InputGroup.Text>
			<Form.Control.Feedback type="invalid">
				{error}
			</Form.Control.Feedback>
		</InputGroup>
	);
};

export default PasswordInput;
