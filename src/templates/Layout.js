import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Hero from "./Hero";

const Layout = () => {
    return (
        <Container className="" maxwidth="xl">
            <Hero />
            <Outlet />
        </Container>
    )
}

export default Layout