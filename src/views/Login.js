import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Grid from '@material-ui/core/Grid';
import worldImage from '../assets/world_map.png'

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    background-image: url("${worldImage}");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center; 
`;

const StyledHeading = styled.h1`
    text-align: center;
    margin-top: 2%;
    color: ${({ theme }) => theme.colors.darkblue};
`;

const StyledSubHeading = styled.h2`
    text-align: center;
    margin-top: 2%;
    color: ${({ theme }) => theme.colors.darkblue};
`;

const StyledGrid = styled(Grid)`
    margin-bottom: 15vh;
`;

function Login(props) {

    const { signIn } = props;
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    const handleSubmit = async data => {
        try {
            const {email, password} = data;
            await signIn(email,password);
        } catch(e) {
            setServerErrorMessage(e.message);
        }
    }

    return (
        <StyledWrapper>
            <StyledGrid container justify="center">
                <Grid item xs={10} sm={6} md={4} lg={3}>
                    <StyledHeading>
                        Telesoft
                    </StyledHeading>
                    <StyledSubHeading>
                        Server Rack
                    </StyledSubHeading>
                    <LoginForm onSubmit={handleSubmit} serverError={serverErrorMessage}/>
                    <label>Note: Default login is admin@telesoft.com password. Account is automatically created on app start-up.</label>
                </Grid>
            </StyledGrid>
        </StyledWrapper>
    );
}

Login.propTypes  = {
    signIn: PropTypes.func.isRequired
}

export default Login;
