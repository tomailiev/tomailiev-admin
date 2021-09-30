import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";

function GroupName({ values, touched, errors, handleChange }) {

    const [groups, setGroups] = useState([{ name: 'pbo', id: '12h3', venues: ['fbc', 'reed'] }, { name: 'abs', id: '4ha83', venues: ['grace', 'st. stephens'] }]);

    return (
        <Autocomplete
            freeSolo
            selectOnFocus
            onSelectCapture={handleChange}
            options={groups}
            // onChange={handleChange}
            getOptionLabel={option => option.name}
            renderInput={(params) => (
                <TextField {...params}
                    name={'groupName'}
                    id={'groupName'}
                    type={'groupName'}
                    label={'groupName'}
                    value={values['groupName']}
                    onChange={handleChange}
                    error={touched['groupName'] && !!errors['groupName']}
                    helperText={errors['groupName']} />
            )}
        />
    )
}

export default GroupName;