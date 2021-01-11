import React, { useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top:20px;
`;

const StyledTextField = styled(TextField)`
	&& {
		width: 80%;
		margin: 0 10% 0 10%;
		.MuiInputBase-root {
			background-color: white;
		}
	}
`;

const StyledForm = styled.form`
    padding-bottom: 20px;
`;

function ChangeEmailForm(props) {

    const { user, onSubmit } = props;

    const userFormSchema = yup.object().shape({
        email: yup.string().email('Enter a valid email').required('Enter an email')
    });
	const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(userFormSchema) });


    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    // open/close the change email dialog
    const handleOpenEmail = () => {
        setEmailDialogOpen(true);
    }
    const handleCloseEmail = () => {
        setEmailDialogOpen(false);
        setNewEmail('')
    }

    const handleInnerSubmit = (data) => {
        handleOpenEmail()
        setNewEmail(data.email)
     }
    const handleEmailDialogsubmit = () => {
        onSubmit(newEmail)
        handleCloseEmail()
    }

    return (
        <div>
            <StyledForm onSubmit={handleSubmit(handleInnerSubmit)}>
                <p>
                    <StyledTextField
                        name="email"
                        label="Email"
                        type="text"
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.message : ""}
                        inputRef={register}
                        defaultValue={user.email}
                    />
                </p>
                <StyledButtonWrapper>
                    <Button type="submit" variant="contained" color="primary">Change Email</Button>
                </StyledButtonWrapper>
            </StyledForm>

            <Dialog open={emailDialogOpen} onClose={handleCloseEmail} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Change Email?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The email for account {user.email} will be changed to {newEmail}, and you will be asked to sign in again. Continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmailDialogsubmit} color="primary">Yes</Button>
                    <Button onClick={handleCloseEmail} color="primary" autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ChangeEmailForm.propTypes = {
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ChangeEmailForm;
