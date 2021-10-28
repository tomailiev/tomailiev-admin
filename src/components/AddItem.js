import { Box, Button, Container, Grid, Menu, MenuItem } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import GroupContext from "../context/groupContext";
import LoadingContext from "../context/loadingContext";
import TypeContext from "../context/typeContext";
import fetchEvents from "../utils/fetchEvents";
import * as initialValues from '../utils/initialValues';
import * as validationSchemas from '../utils/yup-schemas';
import GroupSelect from "./GroupSelect";
import ItemAddForm from "./ItemAddForm";
import ItemCard from "./ItemCard";

function AddItem({ location }) {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { type, setType } = useContext(TypeContext);
    const { group, setGroup } = useContext(GroupContext);
    const [formObjects, setFormObjects] = useState([]);
    const [fetchedEvents, setFetchedEvents] = useState([]);

    useEffect(() => {
        setType(location.pathname.substring(5, location.pathname.length - 1));
        return () => setGroup(null);

    }, [location.pathname, setType, setGroup]);

    function handleAddItem(e) {
        setFormObjects(prev => prev.concat(<ItemAddForm initialValues={initialValues[type]} validationSchema={validationSchemas[type]} type={type} />));
    }

    function searchEvents() {
        setIsLoading(true);
        fetchEvents(group.code)
            .then(ev => {
                setFetchedEvents(ev);
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                console.error(e);
            })
    }


    return (
        <>
            <Container maxWidth="sm" style={{ paddingTop: 10 }}>
                {formObjects.map((x, i) => <div key={i}>{x}</div>)}
                {type === 'event' && !group && <GroupSelect />}
                <Box textAlign="center">
                    <Button
                        variant="contained"
                        onClick={handleAddItem}
                        disabled={type === 'event' ? isLoading || !group : isLoading} >
                        Add new {type}...
                    </Button >
                    {type === 'event' && group?.api && <Button variant="contained" onClick={searchEvents}>Search events</Button>}
                </Box>
            </Container>
            {fetchEvents.length && (
                <Container maxWidth="lg" style={{ paddingTop: 10 }}>
                    <Grid container justifyContent="space-evenly" alignItems="stretch" direction="row" spacing={2}>
                        {fetchedEvents.map(x => (
                            <Grid container item xs={12} sm={6} md={3} alignItems="stretch" key={x.eventUrl}>
                                <ItemCard item={x} type="events" />
                            </Grid>
                        )
                        )}
                    </Grid>
                </Container>
            )}
        </>
    )
}

export default AddItem