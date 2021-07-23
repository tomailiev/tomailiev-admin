/* eslint-disable react/react-in-jsx-scope */
import { AppBar, Button, Typography } from '@material-ui/core'
import { useContext } from "react";
import { NavLink } from 'react-router-dom';
import NotificationContext from '../context/notificationContext';
import UserContext from "../context/userContext";
import { firebaseLogout } from '../utils/firebase-auth';

function Header() {
    const { user } = useContext(UserContext);
    const { setNotification } = useContext(NotificationContext);

    const handleLogout = (e) => {
        firebaseLogout()
            .then(() => {
                setNotification({ open: true, message: 'logged out' });
            })
            .catch(e => {
                setNotification({ open: true, message: e.message });
            });
    }

    return (
        <AppBar position="static">
            <Button color="inherit"><NavLink to="/">Home</NavLink></Button>
            {user && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </AppBar>
    )
}

export default Header