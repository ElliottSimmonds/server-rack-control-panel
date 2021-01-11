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

function ChangePasswordForm(props) {

    const { user, onSubmit } = props;

    const userFormSchema = yup.object().shape({
        password: yup.string().required('Enter a password').min(5, 'Password must be 5 characters long')
    });
    const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(userFormSchema) });
    
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    // open/close the reset password dialog
    const handleOpenPassword = () => {
        setPasswordDialogOpen(true);
    }
    const handleClosePassword = () => {
        setPasswordDialogOpen(false);
        setNewPassword('')
    }

    const handleInnerSubmit = (data) => {
        handleOpenPassword()
        setNewPassword(data.password)
     }
    const handlePasswordDialogsubmit = () => {
        onSubmit(newPassword)
        handleClosePassword()
    }

    return (
        <div>
            <StyledForm id="passwordForm" onSubmit={handleSubmit(handleInnerSubmit)}>
                <p>
                    <StyledTextField
                        name="password"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        error={Boolean(errors.password)}
                        helperText={errors.password ? errors.password.message : ""}
                        inputRef={register}
                    />
                </p>
                <StyledButtonWrapper>
                    <Button type="submit" variant="contained" color="primary">Change Password</Button>
                </StyledButtonWrapper>
            </StyledForm>

            <Dialog open={passwordDialogOpen} onClose={handleClosePassword} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Change Password?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The password for {user.email} will be changed, and you will be asked to sign in again. Continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePasswordDialogsubmit} color="primary">Yes</Button>
                    <Button onClick={handleClosePassword} color="primary" autoFocus>No</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

ChangePasswordForm.propTypes = {
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
