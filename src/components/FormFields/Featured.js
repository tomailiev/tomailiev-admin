import { FormControlLabel, Switch } from "@material-ui/core"
import { useState } from "react";

function Featured({ featuredValue }) {

    const [featured, setFeatured] = useState(featuredValue);

    const handleSwitchChange = (e) => {
        setFeatured(e.target.checked);
    }

    return (
        <FormControlLabel
            control={<Switch checked={featured} onChange={handleSwitchChange} name="checkedA" />}
            label={'featured'}
        />
    )
}

export default Featured