import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


function DateTime({ values, touched, errors, setFieldValue }) {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
                InputLabelProps={{ shrink: true }}
                id={'dateTime'}
                ampm={false}
                name={'dateTime'}
                value={values['dateTime']}
                onChange={date => setFieldValue('dateTime', date)}
                label={'dateTime'}
                onError={console.log}
                minDate={new Date()}
                format="yyyy/MM/dd hh:mm"
                error={touched['dateTime'] && !!errors['dateTime']}
                helperText={errors['dateTime']}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DateTime