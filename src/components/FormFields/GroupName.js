import { TextField } from "@material-ui/core";
import { useContext } from "react";
import GroupContext from "../../context/groupContext";

function GroupName({ values, errors, touched }) {

    const { group } = useContext(GroupContext);
    return (
        <TextField
            id={'groupName'}
            name={'groupName'}
            type={'groupName'}
            label={'groupName'}
            defaultValue={group?.name || values['groupName']}
            error={touched['groupName'] && !!errors['groupName']}
            helperText={errors['groupName']}
            // disabled={!!group}
        />
    )
}

export default GroupName;