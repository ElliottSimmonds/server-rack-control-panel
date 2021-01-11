import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
	&& {
		width: 80%;
		margin: 0 10% 16px 10%;
		.MuiInputBase-root {
			background-color: white;
		}
	}
`;

const StyledButton = styled(Button)`
    && {
        width: 60%;
    }
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledLabel = styled.div`
	width: 100%;
	color: ${({ theme }) => theme.colors.red};
	text-align: center;
	padding-top: 10px;
`;

function LoginForm(props) {

	const {onSubmit, serverError} = props;

	const loginFormSchema = yup.object().shape({
		email: yup.string().email('Enter a valid email').required('Enter an email'),
		password: yup.string().required('Enter a password')
	})

	const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(loginFormSchema) });

	const handleInnerSubmit = data => { onSubmit(data) }

  	return (

		<form onSubmit={handleSubmit(handleInnerSubmit)}>

			<StyledTextField
				name="email"
				label="Email"
				type="text"
				variant="outlined"
				error={Boolean(errors.email)}
				helperText={errors.email ? errors.email.message : ""}
				inputRef={register}
			/>
		
			<StyledTextField
				name="password"
				label="Password"
				type="password"
				variant="outlined"
				error={Boolean(errors.password)}
				helperText={errors.password ? errors.password.message : ""}
				inputRef={register}
			/>

			<StyledButtonWrapper>
				<StyledButton type="submit" variant="contained" color="primary">Login</StyledButton>
			</StyledButtonWrapper>

			<StyledLabel>{serverError ? "Incorrect email address or password" : ""}</StyledLabel>
		</form>
	
  	);
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	serverError: PropTypes.string
};
  
LoginForm.defaultProps = {
	serverError: '',
};

export default LoginForm;
