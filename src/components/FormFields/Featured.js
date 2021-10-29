import { FormControlLabel, Switch } from "@material-ui/core"

function Featured({ featuredValue, setFeatured }) {

    // const [featured, setFeatured] = useState(featuredValue);

    const handleSwitchChange = (e) => {
        setFeatured(e.target.checked);
    }

    return (
        <FormControlLabel
            control={<Switch checked={featuredValue} onChange={handleSwitchChange} name="checkedA" />}
            label={'featured'}
        />
    )
}

export default Featured