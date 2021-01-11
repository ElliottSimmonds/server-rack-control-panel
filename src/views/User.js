import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useLocation } from "react-router-dom";
import Tile from "../components/Tile";
import ChangeEmailForm from "../components/ChangeEmailForm";
import ChangePasswordForm from "../components/ChangePasswordForm";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

const StyledTile = styled(Tile)`
    padding: 10px 20px 20px 20px;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top:20px;
`;

const StyledDeleteButton = styled(Button)`
    && {
        color: white;
        background-color: ${({ theme }) => theme.colors.red};
        transition: 0.3s;
        :hover {
            background-color: ${({ theme }) => theme.colors.darkred};
        }
    }
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

const ViewWrapper = styled.div`
    @media (min-width: 960px) {
        margin-left: 250px;
    }
`;

function User(props) {

    const { user, userEntry, deleteUser, deleteUserEntry, updatePassword, changeEmail, updateUserEntry, signOut } = props;

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const handleDeleteClick = (e) => {
        console.log("Deleting user");
        setDeleteDialogOpen(false);
        deleteUserEntry(userEntry.id).then(deleteUser());
    }

    const handleChangePasswordSubmit = (password) => {
        console.log("Changing password");
        updatePassword(password).then(signOut());
    }

    const handleChangeEmailSubmit = (email) => {
        console.log("Changing email");
        let newEntry = {...userEntry.data()}
        newEntry.email = email;
        updateUserEntry(userEntry.id, newEntry);
        changeEmail(email).then(signOut());
    }

    // open/close the delete account dialog
    const handleOpenDelete = () => {
        setDeleteDialogOpen(true);
    }
    const handleCloseDelete = () => {
        setDeleteDialogOpen(false);
    }

    return (
        <ViewWrapper>
            <Grid container justify="center">
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <StyledTile>
                        {user.email && (
                            <ChangeEmailForm user={user} onSubmit={handleChangeEmailSubmit}></ChangeEmailForm>
                        )}
                        <ChangePasswordForm user={user} onSubmit={handleChangePasswordSubmit}></ChangePasswordForm>

                        <StyledButtonWrapper>
                            <StyledDeleteButton variant="contained" color="primary" onClick={handleOpenDelete}>Delete Account</StyledDeleteButton>
                        </StyledButtonWrapper>

                        <Dialog open={deleteDialogOpen} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"Delete Account?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    This will permanently delete the account attached to {user.email}. It cannot be recovered. Continue?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDeleteClick} color="primary">Yes</Button>
                                <Button onClick={handleCloseDelete} color="primary" autoFocus>No</Button>
                            </DialogActions>
                        </Dialog>
                    
                    </StyledTile>
                </Grid>
            </Grid>
        </ViewWrapper>
    );
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    userEntry: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
    deleteUserEntry: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired,
    updateUserEntry: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
};

export default User;
