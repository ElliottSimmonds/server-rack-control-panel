import React from "react";
import styled from "styled-components";
import Tile from "../components/Tile";
import Grid from '@material-ui/core/Grid';

const ViewWrapper = styled.div`
    @media (min-width: 960px) {
        margin-left: 250px;
    }
`;

const StyledP = styled.p`
    margin-left: 20px;
`;

function Help() {

    return (
        <ViewWrapper>
            <Grid container justify="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Tile>
                        <h2>Page Information</h2>
                        <h4>Dashboard</h4>
                        <StyledP>
                        Contains a list of servers on the network

                        <ul>
                            <li>Light indicators represent the power state of each system. Green for on, red for off and yellow for restarting.</li>
                            <li>Click systems to expand and display additional information and controls.</li>
                            <li>Create new system entries with the "Add system" button.</li>
                            <li>After entering the required details, the rest is automatically generated to simulate possible real world system information.</li>
                            <li>The details of existing systems can be edited by clicking the "edit" button within their expanded view.</li>
                        </ul>  

                        </StyledP>
                        <h4>User Settings</h4>
                        <StyledP>
                        Change account details such as email and password. Account can also be deleted from here.
                        </StyledP>
                        <h4>User Account Control</h4>
                        <StyledP>
                        From this page, admin users can create new accounts and change the permissions of existing users.
                        </StyledP>
                        <h4>Settings</h4>
                        <StyledP>
                        Page to control the client side application features, including the disabling of notifications and toggling dark mode.
                        Currently not implemented.
                        </StyledP>
                    </Tile>
                </Grid>
            </Grid>
        </ViewWrapper>
    );
}

export default Help;
