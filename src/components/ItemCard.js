import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid } from "@material-ui/core";

function ItemCard({ item, editMode }) {

    function toggleEdit(e) {
        console.log(item);
    }

    return (
        <Card>
            <CardActionArea>
                {(item.imageUrl || item.audioUrl || item.videoUrl) && <CardMedia
                    component={item.imageUrl ? 'img' : 'iframe'}
                    alt="there should be a pic here"
                    width="100%"
                    src={item.imageUrl || item.audioUrl || item.videoUrl}
                    title="there should be a pic here"
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title || item.eventName || item.caption}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.description || item.groupName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={toggleEdit} size="small" color="primary">
                    {editMode ? 'Save' : 'Edit'}
                </Button>
                <Button size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default ItemCard;