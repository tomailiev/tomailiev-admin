import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import * as initialValues from '../utils/initialValues';
import * as validationSchemas from '../utils/yup-schemas';
import AddEditForm from "./AddEditForm";

function AddItem({ location }) {
    const [formType, setFormType] = useState('');
    const [formObjects, setFormObjects] = useState([]);
    useEffect(() => {
        setFormType(location.pathname.substring(5, location.pathname.length - 1))
    }, [location.pathname]);

    function handleAddItem(e) {
        setFormObjects(prev => prev.concat(<AddEditForm initialValues={initialValues[formType]} validationSchema={validationSchemas[formType]} type={formType} />));
    }

    return (
        <div>
            {formObjects.map((x, i) => <div key={i}>{x}</div>)}
            < Button variant="contained" onClick={handleAddItem} > Add new {formType}...</Button >
        </div>
    )
}

export default AddItem