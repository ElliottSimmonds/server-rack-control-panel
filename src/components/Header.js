import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Menu from "./Menu"
import Hidden from '@material-ui/core/Hidden';

const StyledTitle1 = styled.h2`
    width: 100%;
    color: white;
    text-align: center;
    margin: 8px;
    padding-right: 50px;
`;

const StyledTitle2 = styled.h1`
    width: calc(100% - 250px);
    text-align: center;
    margin: 10px;
    margin-left:250px;
`;

const StyledWrapper = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.darkblue};
    height: 50px;
    display: flex;
    justify-content: space-between;
`;

function Header(props) {

    const { isAdmin, signOut } = props;

    const location = useLocation();
    let headerTitle = '';

    switch (location.pathname) {
        case "/":
            headerTitle = "Dashboard";
            break;
        case "/settings":
            headerTitle = "Settings";
            break;
        case "/user":
            headerTitle = "User Settings";
            break;
        case "/uac":
            headerTitle = "User Account Control";
            break;
        case "/help":
            headerTitle = "Help";
            break;
        case "/config-system":
            headerTitle = "Add/Edit System";
            break;
        case "/create-user":
            headerTitle = "Create User";
            break;
    }

    return (
        <React.Fragment>
            <Hidden mdUp implementation="css">
                <StyledWrapper>
                    <Menu isAdmin={isAdmin} signOut={signOut}/>
                    <StyledTitle1>{headerTitle}</StyledTitle1>
                </StyledWrapper>
            </Hidden>
            <Hidden smDown implementation="css">
                <Menu isAdmin={isAdmin} signOut={signOut}/>
                <StyledTitle2>{headerTitle}</StyledTitle2>
            </Hidden>
        </React.Fragment>
    );
}

Header.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
};

export default Header;