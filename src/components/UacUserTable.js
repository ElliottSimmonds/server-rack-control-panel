import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function UacUserTable(props) {

    const { user, onChange, userEntryList } = props;

    return (
        <TableContainer>
            {userEntryList && (<label>Found {userEntryList.length} users(s):</label>)}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">User</TableCell>
                        <TableCell align="left">Last Active</TableCell>
                        <TableCell align="left">Change Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {   
                        userEntryList.map((userEntry, index) => 
                            <TableRow key={index}>
                                <TableCell align="left">{userEntry.email}</TableCell>
                                <TableCell align="left">{moment(userEntry.lastActive.toDate()).fromNow()}</TableCell>
                                <TableCell >
                                    <Select id={"roles"+index} onChange={(event) => {onChange(event, userEntry, index)}} value={userEntryList[index].role} disabled={user.uid == userEntry.uid}>
                                        <MenuItem value="guest">Guest</MenuItem>
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

UacUserTable.propTypes = {
    user: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    userEntryList: PropTypes.array.isRequired
};

export default UacUserTable;