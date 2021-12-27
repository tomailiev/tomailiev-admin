import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import { useState, useContext, useEffect } from 'react';
import LoadingContext from '../context/loadingContext';
import GroupContext from '../context/groupContext';
import ItemAddForm from "./ItemAddForm";
import { getContent, uploadData } from '../utils/firebase-db'
import * as initialValues from '../utils/initialValues';
import * as validationSchemas from '../utils/yup-schemas';
import NotificationContext from "../context/notificationContext";


function GroupSelect() {
    const { setNotification } = useContext(NotificationContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { setGroup } = useContext(GroupContext);
    const [anchor, setAnchor] = useState(null);
    const [newGroup, setNewGroup] = useState(false);

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getContent('groups')
            .then(i => {
                setGroups(i);
                setIsLoading(false);
            })
            .catch(err => {
                setNotification(err);
                setIsLoading(false);
            })
    }, [setIsLoading, setNotification]);

    function openMenu(e) {
        setAnchor(e.currentTarget);
    }

    function selectGroup(e) {
        setGroup(groups.find(x => x.name === e.target.textContent));
        setAnchor(null);
    }

    function addNewGroup(e) {
        setNewGroup(false);
        setIsLoading(true);
        uploadData('group', e)
            .then(() => {
                setNotification('Group added');
                setIsLoading(false);
                setGroup(e);
            })
            .catch(err => setNotification(err))
    }

    return (
        <Box textAlign="center" paddingBottom="10px">
            <Button variant="contained" disabled={isLoading} onClick={openMenu}>Pick group</Button>
            <Menu anchorEl={anchor} open={!!anchor} keepMounted onClick={selectGroup}>
                {groups.map(({ name, id }) => <MenuItem key={id}>{name}</MenuItem>)}
            </Menu>
            {/* <div>or</div> */}
            <Button variant="contained" onClick={() => setNewGroup(true)}>Add new group...</Button>
            {newGroup && <ItemAddForm initialValues={initialValues['group']} validationSchema={validationSchemas['group']} type={'group'} setGroup={addNewGroup} />}
        </Box>
    );
}

export default GroupSelect;