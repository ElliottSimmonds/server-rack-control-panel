import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Tile from '../components/Tile';

const StyledSwitch = styled(Switch)`
    float: right;
`;

const StyledDiv = styled.div`
    height:50px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ViewWrapper = styled.div`
    @media (min-width: 960px) {
        margin-left: 250px;
    }
`;

function Settings(props) {

    const { user } = props;

    const [notifications, enableNotifications] = useState(true);
    const [darkMode, enableDarkMode] = useState(false);

    const handleNotificationChange = () => {
        enableNotifications(!notifications);
    }
    const handleDarkModeChange = () => {
        enableDarkMode(!darkMode);
    }

    return (
        <ViewWrapper>
            <Grid container justify="center">
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Tile>
                        <StyledDiv>
                            <span>Notifications</span>
                            <StyledSwitch color="primary" checked={notifications} onChange={handleNotificationChange}></StyledSwitch>
                        </StyledDiv>
                        <StyledDiv>
                            <span>Dark mode</span>
                            <StyledSwitch color="primary" checked={darkMode} onChange={handleDarkModeChange}></StyledSwitch>
                        </StyledDiv>
                    </Tile>
                </Grid>
            </Grid>
        </ViewWrapper>
    );
}

Settings.propTypes = { 
    user: PropTypes.object.isRequired,
};

export default Settings;
