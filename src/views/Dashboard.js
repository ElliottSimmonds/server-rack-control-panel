import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SystemBlock from "../components/SystemBlock";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const StyledAddButtonWrapper = styled.div`
    position: fixed;
    bottom: 1em;
    right: 1em;
`;

const StyledSpan = styled.span`
    margin-right: 10px;
`;

const StyledLabel = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`;

const ViewWrapper = styled.div`
    @media (min-width: 960px) {
        margin-left: 250px;
    }
`;

function Dashboard(props) {

    const { readSystems, deleteSystem, updateSystem } = props;

    const [allSystems, setAllsystems] = useState([]);

    const getAllSystems = async () => {
        const aSystems = await readSystems();
        let systems = [];
        aSystems.forEach(s => systems.push({...s.data(),...{id:s.id} }));
        setAllsystems(systems);
    }
    useEffect(() => {
        getAllSystems()
    }, [])

    const handleDeleteSystem = (id) => {
        console.log("delete", id)
        deleteSystem(id);
        getAllSystems(); // reloads systems when one is deleted
    }

    // simulates power control functionality
    const handlePowerOn = (id) => {
        console.log("power on",id)
        setTimeout(() => {
            updateSystem(id,{status:'On'}).then(getAllSystems());
        }, 2000);
    }
    const handleRestart = (id) => {
        console.log("restart",id)
        setTimeout(() => {
            updateSystem(id,{status:'Restarting'}).then(getAllSystems());
        }, 500);
        setTimeout(() => {
            updateSystem(id,{status:'Off', lastShutdown: new Date()}).then(getAllSystems());
        }, 2000);
        setTimeout(() => {
            updateSystem(id,{status:'On'}).then(getAllSystems());
        }, 4000);
    }
    const handleShutdown = (id) => {
        console.log("shutdown",id)
        setTimeout(() => {
            updateSystem(id,{status:'Off', lastShutdown: new Date()}).then(getAllSystems());
        }, 500);
    }

    return (
        <ViewWrapper>
            {allSystems && (<StyledLabel>Found {allSystems.length} system(s):</StyledLabel>)}
            {   
                allSystems.map((system, index) => <SystemBlock key={index} system={system} handleDeleteSystem={handleDeleteSystem} deleteSystem={deleteSystem} powerOn={handlePowerOn} restart={handleRestart} shutdown={handleShutdown}/>)
            }
            <StyledAddButtonWrapper>
                <StyledSpan>
                    Add System
                </StyledSpan>
                <Fab color="primary" aria-label="new system" component={Link} to="/config-system">
                    <AddIcon />
                </Fab>
            </StyledAddButtonWrapper>
        </ViewWrapper>
    );
}

Dashboard.propTypes = {
    readSystems: PropTypes.func.isRequired,
    deleteSystem: PropTypes.func.isRequired,
    updateSystem: PropTypes.func.isRequired,
};

export default Dashboard;
