import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';
import IndicatorLight from '@material-ui/icons/FiberManualRecord';
import GroupIcon from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

const ParentDiv = styled.div`
    margin: 10px;
`;

const StyledAccordion = styled(Accordion)`
    width: 100%;
`;

const StyledGreenButton = styled(Button)`
    && {
        color: white;
        background-color: ${({ theme }) => theme.colors.green};
        transition: 0.3s;
        :hover {
            background-color: ${({ theme }) => theme.colors.darkgreen};
        }
    }
`;

const StyledRedButton = styled(Button)`
    && {
        color: white;
        background-color: ${({ theme }) => theme.colors.red};
        transition: 0.3s;
        :hover {
            background-color: ${({ theme }) => theme.colors.darkred};
        }
    }
`;

const StyledYellowButton = styled(Button)`
    && {
        color: white;
        
        background-color: ${({ theme }) => theme.colors.yellow};
        transition: 0.3s;
        :hover {
            background-color: ${({ theme }) => theme.colors.darkyellow};
        }
    }
`;

const StyledInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    @media (min-width: 960px) {
        border-right: 3px solid ${({ theme }) => theme.colors.lightgrey};
    }
`;

const VerticalWrapper = styled.div`
    vertical-align: middle;
    text-align: center;
`;

const StyledNameWrapper = styled.div`
    width:90px;
    text-align: center;
    margin-right: 20px;
`;

const StyledGroupIcon = styled(GroupIcon)`
    && {
        height: 30px;
        width: 30px;
    }
`;

const StyledHidden = styled(Hidden)`
    && {
        height: 100%;
    }
`;

const StyledUserCount = styled.h3`
    padding-left: 10px;
`;

const StyledGrid = styled(Grid)`
    height: 100%;
`;

const MobileOnlyRow = styled(TableRow)` // hide table row when at certain width
    && {
        @media (min-width: 960px) {
            display:none;
        }
    }
`;

function SystemBlock(props) {

    const { system, handleDeleteSystem, powerOn, restart, shutdown } = props;
    //console.log(system);

    const StatusIndicator = styled(IndicatorLight)`
        && {
            height: 30px;
            width: 30px;
            margin: 0 15px 0 0;
            color: ${system.status === 'Off' ? ({ theme }) => theme.colors.red : (system.status === 'On' ? ({ theme }) => theme.colors.green : ({ theme }) => theme.colors.yellow)};
        }
    `;

    const StyledTemperature = styled.span`
        color: ${system.fpgaTemperature > 80 ? ({ theme }) => theme.colors.red : (system.fpgaTemperature < 50 ? ({ theme }) => theme.colors.green : ({ theme }) => theme.colors.yellow)};;
    `;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // open/close the delete system dialog
    const handleOpenDelete = () => {
        setDeleteDialogOpen(true);
    }
    const handleCloseDelete = () => {
        setDeleteDialogOpen(false);
    }
    const handleDeleteDialogSubmit = () => {
        handleCloseDelete();
        handleDeleteSystem(system.id);
    }

    const innerGrid =                                     
        <StyledGrid container>                 
            <Grid item xs={4}>
                <StyledInfoWrapper>
                    <VerticalWrapper>
                        <div>Last Shutdown:</div>
                        <div>{moment(system.lastShutdown.toDate()).format('HH:mm ddd D MMM ')}</div>
                    </VerticalWrapper>
                </StyledInfoWrapper>
            </Grid>
            <Grid item xs={4}>
                <StyledInfoWrapper>
                    <VerticalWrapper>
                        <div>FPGA Temperature:</div>
                        <div><StyledTemperature>{system.fpgaTemperature}</StyledTemperature>°C</div>
                    </VerticalWrapper>
                </StyledInfoWrapper>
            </Grid>
            <Grid item xs={4}>
                <StyledInfoWrapper>
                    <VerticalWrapper>
                        <div>FPGA Image:</div>
                        <div>{system.fpgaImage}</div>
                    </VerticalWrapper>
                </StyledInfoWrapper>
            </Grid>
        </StyledGrid>
    
    return (
        <React.Fragment>
            <ParentDiv>
                <StyledAccordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <StyledInfoWrapper>
                            <StatusIndicator/>
                            <div>
                                <StyledNameWrapper>"{system.name}"</StyledNameWrapper>
                                <StyledNameWrapper>{system.systemIp}</StyledNameWrapper>
                            </div>
                        </StyledInfoWrapper>
                        <Grid container>
                            <Grid item xs={10}>
                                <StyledHidden smDown implementation="css">
                                    {innerGrid}
                                </StyledHidden>
                            </Grid>
                            <Grid item xs={2}>
                                <StyledInfoWrapper>
                                    <StyledGroupIcon/>
                                    <StyledUserCount>{system.activeUsers.length}</StyledUserCount>
                                </StyledInfoWrapper>
                            </Grid>
                        </Grid>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container justify="center">
                            <Grid item xs={11} sm={10} md={8} lg={5}>
                                <TableContainer>
                                    <Table style={{ tableLayout: 'fixed' }}>
                                        <TableBody>

                                                <MobileOnlyRow>
                                                    <TableCell align="right">Last Shutdown</TableCell>
                                                    <TableCell align="left">{system.fpgaImage}</TableCell>
                                                </MobileOnlyRow>
                                                <MobileOnlyRow>
                                                    <TableCell align="right">FPGA Temperature</TableCell>
                                                    <TableCell align="left"><StyledTemperature>{system.fpgaTemperature}</StyledTemperature>°C</TableCell>
                                                </MobileOnlyRow>
                                                <MobileOnlyRow>
                                                    <TableCell align="right">FPGA Image</TableCell>
                                                    <TableCell align="left">{system.fpgaImage}</TableCell>
                                                </MobileOnlyRow>

                                            <TableRow>
                                                    <TableCell align="right">Status</TableCell>
                                                    <TableCell align="left">{system.status}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="right">Active Users</TableCell>
                                                <TableCell align="left">{system.activeUsers.length > 0 ? system.activeUsers.join(', ') : 'No active users'}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </AccordionDetails>

                    <AccordionActions>
                        {system.status !== "Off" && (<StyledRedButton variant="contained" onClick={() => shutdown(system.id)}>Shutdown</StyledRedButton>)}
                        {system.status === "Off" && (<StyledGreenButton variant="contained" onClick={() => powerOn(system.id)}>Power On</StyledGreenButton>)}
                        {system.status !== "Off" && (<StyledYellowButton variant="contained" onClick={() => restart(system.id)}>Restart</StyledYellowButton>)}
                        <Button variant="contained" color="primary" component={Link} to={{pathname:"/config-system", query:{id: system.id}}}>Edit</Button>
                        <StyledRedButton variant="contained" onClick={handleOpenDelete} startIcon={<DeleteIcon/>}>Delete</StyledRedButton>
                    </AccordionActions>
                </StyledAccordion>
            </ParentDiv>

            <Dialog open={deleteDialogOpen} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Delete System?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        System "{system.name}" will be deleted, and cannot be recovered. Continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogSubmit} color="primary">Yes</Button>
                    <Button onClick={handleCloseDelete} color="primary" autoFocus>No</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

SystemBlock.propTypes = {
    system: PropTypes.object.isRequired,
    handleDeleteSystem: PropTypes.func.isRequired,
    powerOn: PropTypes.func.isRequired,
    restart: PropTypes.func.isRequired,
    shutdown: PropTypes.func.isRequired,
};

export default SystemBlock;
