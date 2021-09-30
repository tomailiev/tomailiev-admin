import { TextField } from "@material-ui/core"

function OtherField({ fieldType, values, handleChange, errors, touched }) {
    return (
        <TextField
            id={fieldType}
            name={fieldType}
            type={fieldType}
            label={fieldType}
            value={values[fieldType]}
            onChange={handleChange}
            error={touched[fieldType] && !!errors[fieldType]}
            helperText={errors[fieldType]} />
    )
}

export default OtherField