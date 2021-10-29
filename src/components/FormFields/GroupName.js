import { TextField } from "@material-ui/core";
import { useContext } from "react";
import GroupContext from "../../context/groupContext";

function GroupName({ values }) {

    const { group } = useContext(GroupContext);
    return (
        <TextField
            id={'groupName'}
            name={'groupName'}
            type={'groupName'}
            label={'groupName'}
            value={group?.name || values['groupName']}
            disabled={!!group}
        />
    )
}

export default GroupName;