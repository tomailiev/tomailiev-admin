import { TextField } from "@material-ui/core";
import { useContext } from "react";
import GroupContext from "../../context/groupContext";

function GroupName() {

    const { group } = useContext(GroupContext);
    return (
        <TextField
            id={'groupName'}
            name={'groupName'}
            type={'groupName'}
            label={'groupName'}
            value={group.name}
            disabled
        />
    )
}

export default GroupName;