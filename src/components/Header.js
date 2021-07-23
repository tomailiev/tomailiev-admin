import { AppBar, Button, Typography } from '@material-ui/core'
import { useContext } from "react";
import UserContext from "../context/userContext";
import { firebaseLogout } from '../utils/firebase-auth';

function Header() {
    const { user } = useContext(UserContext);

    const handleLogout = (e) => {
        firebaseLogout()
            .then(() => {
                console.log('logged out');
            })
            .catch(console.error);
    }

    return (
        <AppBar position="static">
            <Typography variant="h6">
                {user ? `Logged in as ${user.email}` : 'Please log in'}
            </Typography>
            {user && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </AppBar>
    )
}

export default Header