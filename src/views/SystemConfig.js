import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SystemForm from "../components/SystemForm"
import Tile from "../components/Tile";
import Grid from "@material-ui/core/Grid"

const ViewWrapper = styled.div`
    @media (min-width: 960px) {
        margin-left: 250px;
    }
`;

function SystemConfig(props) {

    const { createSystem, readSystem, updateSystem } = props;

    return (
        <ViewWrapper>
            <Grid container justify="center">
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Tile>
                        <SystemForm createSystem={createSystem} readSystem={readSystem} updateSystem={updateSystem}/>
                    </Tile>
                </Grid>
            </Grid>
        </ViewWrapper>
    );
}

SystemConfig.propTypes = {
    createSystem: PropTypes.func.isRequired,
    readSystem: PropTypes.func.isRequired,
    updateSystem: PropTypes.func.isRequired,
};

export default SystemConfig;
