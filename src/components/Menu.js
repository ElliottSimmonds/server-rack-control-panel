import React, { useState } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import HelpIcon from '@material-ui/icons/Help';
import ExitIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

const StyledDiv = styled.div`
    width: 250px;
    color: white;
`;

const StyledPaper = styled.div`
    && {
        background-color: ${({ theme }) => theme.colors.darkblue};
    }
`;

const StyledButton = styled(Button)`
    height:100%;
`;

const StlyedDrawer = styled(Drawer)` // hide popup drawer when permanent draw is introduced
    @media (min-width: 960px) {
        display: none;
    }
`

function Menu(props) {
    const { isAdmin, signOut } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { // allows the menu to be tabbed through
            return;
        }
        setMenuOpen(open);
    };

    const handleSignOutClick = () => {
        signOut();
    }

    const list =
        <StyledDiv onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem button key={"Dashboard"} component={Link} to="/">
                    <ListItemIcon><HomeIcon color="secondary"/></ListItemIcon>
                    <ListItemText primary={"Dashboard"} />
                </ListItem>
                <ListItem button key={"Profile Settings"} component={Link} to="/user">
                    <ListItemIcon><PersonIcon color="secondary"/></ListItemIcon>
                    <ListItemText primary={"Profile"} />
                </ListItem>
                {isAdmin && (<ListItem button key={"User Account Control"} component={Link} to="/uac">
                    <ListItemIcon><GroupIcon color="secondary"/></ListItemIcon>
                    <ListItemText primary={"User Account Control"} />
                </ListItem>)}
                <ListItem button key={"Settings"} component={Link} to="/settings">
                    <ListItemIcon><SettingsIcon color="secondary"/></ListItemIcon>
                    <ListItemText primary={"Settings"} />
                </ListItem>
                <ListItem button key={"Help"} component={Link} to="/help">
                    <ListItemIcon><HelpIcon color="secondary"/></ListItemIcon>
                    <ListItemText primary={"Help"} />
                </ListItem>
                <ListItem button key={"Sign Out"} onClick={handleSignOutClick}>
                    <ListItemIcon><ExitIcon color="secondary"/></ListItemIcon>
                    <ListItemText primary={"Sign Out"} />
                </ListItem>
            </List>
        </StyledDiv>;
    
    return (
        <React.Fragment>
            <Hidden mdUp>
                <StyledButton onClick={toggleDrawer(true)}><MenuIcon color="secondary"/></StyledButton>
                <StlyedDrawer PaperProps={{ component:StyledPaper }} ModalProps={{keepMounted: true}} variant="temporary" anchor='left' open={menuOpen} onClose={toggleDrawer(false)}>
                    {list}
                </StlyedDrawer>
            </Hidden>

            <Hidden smDown>
                <Drawer PaperProps={{ component:StyledPaper }} variant="permanent" open>
                    {list}
                </Drawer>
            </Hidden>
        </React.Fragment>
    );
}

Menu.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
};

export default Menu;