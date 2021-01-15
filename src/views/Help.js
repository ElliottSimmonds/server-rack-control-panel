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
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Tile>
                        <h2>Page Guide</h2>
                        <h4>Dashboard</h4>
                        <StyledP>
                            test
                        </StyledP>
                        <h4>User Settings</h4>
                        <StyledP>

                        </StyledP>
                        <h4>User Account Control</h4>
                        <StyledP>

                        </StyledP>
                        <h4>Settings</h4>
                        <StyledP>

                        </StyledP>
                    </Tile>
                </Grid>
            </Grid>
        </ViewWrapper>
    );
}

export default Help;
