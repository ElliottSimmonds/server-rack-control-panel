import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";

const StyledButton = styled(Button)`
    && {
        margin: 10px;
    }
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledTextField = styled(TextField)`
    && {
       width: 100%;
    }
`;

const StyledLabel = styled.div`
	width: 100%;
	text-align: center;
	padding-top: 10px;
`;

function UserForm(props) {

    const { onSubmit, serverError } = props;

    const userFormSchema = yup.object().shape({
        email: yup.string().email('Enter a valid email').required("Enter an email"),
        password: yup.string().min(5, 'Password must be 5 characters long').required('Enter a password')
    });

	const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(userFormSchema) });

    const handleInnerSubmit = data => { onSubmit(data) }

    return (
        <form onSubmit={handleSubmit(handleInnerSubmit)}>
            <p>
                <StyledTextField
                    name="email"
                    label="Email"
                    type="text"
                    variant="outlined"
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ""}
                    inputRef={register}
                />
            </p>

            <p>
                <StyledTextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ""}
                    inputRef={register}
                />
            </p>

            <StyledButtonWrapper>
                <StyledButton type="submit" variant="contained" color="primary">Confirm</StyledButton>
                <StyledButton variant="contained" component={Link} to="/uac">Cancel</StyledButton>
            </StyledButtonWrapper>

            <StyledLabel>{serverError ? serverError : ""}</StyledLabel>
        </form>
    );
}

UserForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
	serverError: PropTypes.string
};

UserForm.defaultProps = {
	serverError: '',
};

export default UserForm;
