import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Grid, TextField, Box } from '@material-ui/core';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { PICK_UP } from '../../../reducers/alertReducer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const User = () => {
    const [user, setUser] = useState({});

    const dispatch = useDispatch()
    const state = useSelector(state => state.authReducer)

    useEffect(() => {
        infoUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const infoUser = async () => {
        const { token } = state
        try {
            const userRes = await axios.get(
                `https://coding-test.rootstack.net/api/jobs`,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                }
            );

            console.log("User userRes ==>", userRes);
            setUser(userRes.data)
            dispatch({ type: PICK_UP, payload: { open: true, severity: 'info', message: `Bienvenido ${userRes.data.name}` } })

        } catch (error) {
            console.log("error ==>", error);
        }
    };

    const classes = useStyles();

    let created_at = ''
    let updated_at = ''

    if (user.created_at && user.updated_at) {
        const dateCreated_at = new Date(user.created_at);
        const dateUpdated_at = new Date(user.updated_at);

        created_at = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(dateCreated_at);
        updated_at = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(dateUpdated_at);
    }

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <div className={classes.rowContainer}>
                        <Grid container pt={1} mt={1} spacing={2}>
                            <Grid item xs={12} sm={12} md={2}>
                                <Box p={1} bgcolor="grey.300" component="span" display="flex" alignItems="center" height="100%" borderRadius={4}>
                                    {"Id"}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <TextField
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={user.id ? user.id : ''}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.rowContainer}>
                        <Grid container pt={1} mt={1} spacing={2}>
                            <Grid item xs={12} sm={12} md={2}>
                                <Box p={1} bgcolor="grey.300" component="span" display="flex" alignItems="center" height="100%" borderRadius={4}>
                                    {"Name"}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <TextField                                    
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={user.name ? user.name : ''}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.rowContainer}>
                        <Grid container pt={1} mt={1} spacing={2}>
                            <Grid item xs={12} sm={12} md={2}>
                                <Box p={1} bgcolor="grey.300" component="span" display="flex" alignItems="center" height="100%" borderRadius={4}>
                                    {"Email"}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <TextField                                    
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={user.email ? user.email : ''}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.rowContainer}>
                        <Grid container pt={1} mt={1} spacing={2}>
                            <Grid item xs={12} sm={12} md={2}>
                                <Box p={1} bgcolor="grey.300" component="span" display="flex" alignItems="center" height="100%" borderRadius={4}>
                                    {"Created"}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <TextField                                    
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={created_at}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.rowContainer}>
                        <Grid container pt={1} mt={1} spacing={2}>
                            <Grid item xs={12} sm={12} md={2}>
                                <Box p={1} bgcolor="grey.300" component="span" display="flex" alignItems="center" height="100%" borderRadius={4}>
                                    {"Updated"}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <TextField                                    
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled
                                    value={updated_at}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Grid>
        </div>
    )
}

export default User