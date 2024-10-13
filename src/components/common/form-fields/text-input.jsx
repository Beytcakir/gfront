"use client";
import React from "react";
import { Form } from "react-bootstrap";

const TextInput = ({ className, label, error, readOnly, onChange, options, ...rest }) => {
	return (
        <Form.Group className={className} controlId={rest.name}>
            <Form.Label>{label}</Form.Label>
            {options ? ( // Added conditional rendering based on 'options' prop
                <Form.Select
                    {...rest}
                    isInvalid={!!error}
                    readOnly={readOnly}
                    onChange={onChange || (() => {})}
                >
                    <option value="">Seçiniz</option> 
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}{' '}
                    
                </Form.Select>
            ) : (
                <Form.Control
                    {...rest}
                    isInvalid={!!error}
                    readOnly={readOnly}
                    onChange={onChange || (() => {})}
                />
            )}
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextInput;
