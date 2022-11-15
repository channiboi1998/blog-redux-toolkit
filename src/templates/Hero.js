import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom"; 

const Hero = () => {
    return (
        <Container className="container home">
            <Typography gutterBottom variant="h1" component="h1">
                Posts on the wall
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
                Heyya! I'm Christian, a frontend developer from the Philippines. My passion is to build digital products and convert designs into clickable prototypes. I have created this <Link to ="/">mini blog project</Link> to explore things that reactJS can provide. Feel free to play around, you can try to  <Link to="/post">create a post</Link> on this website.
            </Typography>
        </Container>
    )
}

export default Hero