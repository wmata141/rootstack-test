import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import rootStack from '../../../assets/images/banner.png';

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${rootStack})`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    }
}));

const TitleComponent = ({ title }) => {
    const classes = useStyles();

    return (
        <Box className={classes.title}>
            <Box>{title}</Box>
        </Box>
    )
}

export default TitleComponent