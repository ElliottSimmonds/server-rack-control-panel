import React, { useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import Tile from "../components/Tile";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CreateUserForm from "../components/CreateUserForm";

const ViewWrapper = styled.div`
    @media (min-width: 960px) {
        margin-left: 250px;
    }
`;

function CreateUser(props) {

    const { createEmailUser, createUserEntry, signOut } = props;
    const [serverErrorMessage, setServerErrorMessage] = useState();
    let history = useHistory();

    const handleSubmit = async data => {
        try {
            const { email, password } = data;
            await createEmailUser(email, password).then((newuser) => {
                console.log("creating user entry", newuser.user.email);
                createUserEntry({
                    uid: newuser.user.uid,
                    email: newuser.user.email,
                    role: 'user',
                    lastActive: new Date()
                }).then(() => {history.push('/'); signOut()}) // have to sign out because creating a new user reauthenticates, not a final solution!
            });

        } catch(e) {
            setServerErrorMessage(e.message);
        }
    }

    return (
        <ViewWrapper>
            <Grid container justify="center">
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Tile>
                        <CreateUserForm onSubmit={handleSubmit} serverError={serverErrorMessage}/>
                    </Tile>
                </Grid>
            </Grid>
        </ViewWrapper>
    );
}

CreateUser.propTypes = {
    createEmailUser: PropTypes.func.isRequired,
    createUserEntry:  PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
};

export default CreateUser;
