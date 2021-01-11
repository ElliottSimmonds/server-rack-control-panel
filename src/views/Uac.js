import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import Tile from "../components/Tile";
import UacUserTable from "../components/UacUserTable";
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top:20px;
`;

const ViewWrapper = styled.div`
    @media (min-width: 960px) {
        margin-left: 250px;
    }
`;

function Uac(props) {

    const { user, readUserEntries, updateUserEntry } = props;

    const [userEntries, setUserEntries] = useState([]);

    const getUserEntries =  async () => {
        const aUserEntries =  await readUserEntries();
        let userEntries = [];
        aUserEntries.forEach(u => userEntries.push({...u.data(),...{id:u.id}}));
        setUserEntries(userEntries);
    }
    useEffect(() => {
        getUserEntries();
    }, [])

    const handleChange = (event, userEntry, index) => {
        const newRole = event.target.value;
        userEntry.role = newRole;
        delete userEntry.id;
        updateUserEntry(userEntry.id, userEntry);
        getUserEntries(); // update table
    }

    return (
        <ViewWrapper>
            <Grid container justify="center">
                <Grid item xs={12} sm={10} md={8} lg={5}>
                    <Tile>
                        <UacUserTable user={user} onChange={handleChange} userEntryList={userEntries}></UacUserTable>
                        <StyledButtonWrapper>
                            <Button variant="contained" color="primary" component={Link} to="/create-user">Create User</Button>
                        </StyledButtonWrapper>
                    </Tile>
                </Grid>
            </Grid>
        </ViewWrapper>
    );
}

Uac.propTypes = {
    user: PropTypes.object.isRequired,
    readUserEntries: PropTypes.func.isRequired,
    updateUserEntry: PropTypes.func.isRequired,
};

export default Uac;
