import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Grid from '@material-ui/core/Grid';
import worldImage from '../assets/world_map.png';

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

const StyledLogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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

    // logo file can't be imported by login view for some reason, inserted the svg code instead.
    const logo = 
    <svg width="77" height="85" viewBox="0 0 77 85" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
            <line x1="5.75" x2="5.75" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="20.0093" y1="32.0833" x2="20.0093" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="20.0093" x2="20.0093" y2="14.2593" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="49.2408" x2="49.2408" y2="14.2593" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="56.3704" x2="56.3704" y2="14.2593" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="41.3981" x2="41.3981" y2="14.2593" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="34.2685" x2="34.2685" y2="14.2593" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="34.2685" y1="66.3055" x2="34.2685" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="41.3981" y1="66.3055" x2="41.3981" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="27.1389" x2="27.1389" y2="14.2593" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="56.3704" y1="32.0833" x2="56.3704" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="49.2408" y1="32.0833" x2="49.2408" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="27.1389" y1="32.0833" x2="27.1389" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="63.5" x2="63.5" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="70.6296" x2="70.6296" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
            <line x1="12.8796" x2="12.8796" y2="77" stroke="#1AA1DC" stroke-width="3.5"/>
        </g>
        <defs>
            <filter id="filter0_d" x="0" y="0" width="76.3796" height="85" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
        </defs>
    </svg>

    return (
        <StyledWrapper>
            <StyledGrid container justify="center">
                <Grid item xs={10} sm={6} md={4} lg={3}>
                    <StyledLogoWrapper>
                        {logo}
                    </StyledLogoWrapper>
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
