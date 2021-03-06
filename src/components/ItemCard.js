import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import TypeContext from "../context/typeContext";
import ItemEditCard from "./ItemEditCard";

function ItemCard({ item }) {

    const { type } = useContext(TypeContext);
    const [editing, setEditing] = useState(false);

    function switchEditing() {
        setEditing(!editing)
    }

    return editing
        ? <ItemEditCard item={item} type={type} switchEditing={switchEditing} />
        : <Card>
            <CardActionArea>
                {(item.imageUrl || item.audioUrl || item.videoUrl || item.mapCoordinates) && <CardMedia
                    component={item.imageUrl ? 'img' : 'iframe'}
                    alt="there should be a pic here"
                    width="100%"
                    src={item.imageUrl || item.audioUrl || item.videoUrl || item.mapCoordinates}
                    title="there should be a pic here"
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title || item.eventName || item.caption}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.description || item.groupName}
                    </Typography>
                    {item.dateTime && <Typography gutterBottom variant="h5" component="h2">
                        {item.dateTime.toString()}
                    </Typography>}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={switchEditing}>
                    Edit
                </Button>
                {/* <Button size="small" color="primary" onClick={() => setEditing(false)}>
                    Delete
                </Button> */}
            </CardActions>
        </Card>



}

export default ItemCard;