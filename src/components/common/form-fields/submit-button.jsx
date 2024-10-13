"use client";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useFormStatus } from "react-dom";
import { IoLogInOutline } from "react-icons/io5";
const SubmitButton = ({
	title = "Giriş",
	spinnerVariant = "secondary",
	disabled,
	...rest
}) => {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" {...rest} disabled={pending || disabled}>
			{pending ? (
				<Spinner variant={spinnerVariant} size="sm" />
			) : (
				<div className="d-flex justify-content-center">
					<IoLogInOutline className="fs-4 my-auto me-2"/> {title}
				</div>
			)}
		</Button>
	);
};

export default SubmitButton;
