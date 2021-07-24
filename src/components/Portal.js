import { Button, Menu, MenuItem } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingContext from "../context/loadingContext";
import UserContext from "../context/userContext";

function Portal({ history }) {
    const { user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);

    const [anchors, setAnchors] = useState({ items: null, actions: null });
    const [item, setItem] = useState('items...');
    const [action, setAction] = useState('actions...');

    useEffect(() => {
        if (!user && !isLoading) {
            history.push('/');
            return;
        }
    }, [user, isLoading, history]);

    function handleItemMenuOpen(e) {
        setAnchors(prev => ({ ...prev, items: e.currentTarget }));
    }

    function handleItemChoice(e) {
        setItem(prev => e.target.textContent || prev);
        setAnchors(prev => ({ ...prev, items: null }));
    }

    function handleActionMenuOpen(e) {
        setAnchors(prev => ({ ...prev, actions: e.currentTarget }));
    }

    function handleActionChoice(e) {
        setAction(prev => e.target.textContent || prev);
        setAnchors(prev => ({ ...prev, actions: null }));
    }

    return <div>
        <h2>
            Welcome to the Portal
        </h2>
        <h6>What would you like to do?</h6>
        <section>
            <Button onClick={handleActionMenuOpen} color="primary">{action}</Button>
            <Menu anchorEl={anchors.actions} open={!!anchors.actions} keepMounted onClick={handleActionChoice}>
                <MenuItem>view</MenuItem>
                <MenuItem>add</MenuItem>
            </Menu>
            <Button onClick={handleItemMenuOpen}>{item}</Button>
            <Menu anchorEl={anchors.items} open={!!anchors.items} keepMounted onClick={handleItemChoice}>
                <MenuItem>events</MenuItem>
                <MenuItem>audios</MenuItem>
                <MenuItem>images</MenuItem>
                <MenuItem>videos</MenuItem>
                <MenuItem>recs</MenuItem>
            </Menu>
            <Button disabled={item === 'items...' || action === 'actions...'}>
                <Link to={`${action}/${item}`}>GO!</Link>
            </Button>
        </section>
    </div>
}

export default Portal;