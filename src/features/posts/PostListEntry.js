import { Link } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { getUserNameById } from "../users/UsersSlice";

const PostListEntry = ({ post }) => {

    return (
        <Card className="post-entry">
            <CardContent className="content">
                <Box className="title-holder" style={{ backgroundImage: `url("https://picsum.photos/seed/picsum/400/400")` }}>
                    <Container className="dark-overlay"></Container>
                    <Typography className="title" gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography className="author-date" variant="body2" color="text.secondary">
                        {useSelector(getUserNameById(post.user_id))}
                    </Typography>
                </Box>
                <Box className="post-details">
                    <Typography className="excerpt" variant="body2" color="text.secondary">
                        {post.body.length > 250 ?
                            `${post.body.substring(0, 250)}...` : post.body
                        }
                    </Typography>
                </Box>
            </CardContent>
            <CardActions className="actions">
                <Link to={"post/"+post.id}>
                    <Button size="small">Read More</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default PostListEntry