import { Box, Button, Container, Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../context/loadingContext";
import TypeContext from "../context/typeContext";
import * as initialValues from '../utils/initialValues';
import * as validationSchemas from '../utils/yup-schemas';
import ItemAddForm from "./ItemAddForm";

function AddItem({ location }) {
    const { isLoading } = useContext(LoadingContext);
    const { type, setType } = useContext(TypeContext);
    const [formObjects, setFormObjects] = useState([]);
    useEffect(() => {
        setType(location.pathname.substring(5, location.pathname.length - 1))
    }, [location.pathname, setType]);

    function handleAddItem(e) {
        setFormObjects(prev => prev.concat(<ItemAddForm initialValues={initialValues[type]} validationSchema={validationSchemas[type]} type={type} />));
    }

    return (
        <Container maxWidth="sm">
            {formObjects.map((x, i) => <div key={i}>{x}</div>)}
            <Box textAlign="center">
                <Button variant="contained" onClick={handleAddItem} disabled={isLoading} > Add new {type}...</Button >
            </Box>
        </Container>
    )
}

export default AddItem