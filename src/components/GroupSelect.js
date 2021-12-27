import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import { useState, useContext } from 'react';
import LoadingContext from '../context/loadingContext';
import GroupContext from '../context/groupContext';
import ItemAddForm from "./ItemAddForm";
import * as initialValues from '../utils/initialValues';
import * as validationSchemas from '../utils/yup-schemas';

function GroupSelect() {
    const { isLoading } = useContext(LoadingContext);
    const { group, setGroup } = useContext(GroupContext);
    const [anchor, setAnchor] = useState(null);
    const [newGroup, setNewGroup] = useState(false);

    const groups = [
        { name: 'Portland Baroque Orchestra', code: 'pbo', id: '12h3', api: false },
        { name: 'American Bach Soloists', code: 'abs', id: '4ha83', api: true },
        { name: 'Philharmonia Baroque Orchestra', code: 'phil', id: '124hja', api: true }
    ];

    function openMenu(e) {
        setAnchor(e.currentTarget);
    }

    function selectGroup(e) {
        setGroup(groups.find(x => x.name === e.target.textContent));
        setAnchor(null);
    }



    return (
        <Box textAlign="center" paddingBottom="10px">
            <Button variant="contained" disabled={isLoading} onClick={openMenu}>Pick group</Button>
            <Menu anchorEl={anchor} open={!!anchor} keepMounted onClick={selectGroup}>
                {groups.map(({ name, id }) => <MenuItem key={id}>{name}</MenuItem>)}
            </Menu>
            {/* <div>or</div> */}
            <Button variant="contained" onClick={() => setNewGroup(true)}>Add new group...</Button>
            {newGroup && !group && <ItemAddForm initialValues={initialValues['group']} validationSchema={validationSchemas['group']} type={'group'} setGroup={setGroup} />}
        </Box>
    );
}

export default GroupSelect;