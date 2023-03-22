import React from 'react';

import { makeStyles } from '@mui/styles';
import {
    Grid,
} from '@mui/material';
import MainAppbar from 'components/MainAppbar';
import Calculator from 'components/Calculator';
import Blog from './Blog';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { ROUTES } from '../constants';


const useStyles = makeStyles((theme) => ({
    main: {
        flexGrow: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
    },
    content: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(4)
    },
}));

/**
 * Main container for all of the components.
 */
const Main = ({ changeTheme, theme, phrases, language, changeLanguage }) => {
    const classes = useStyles();

    return (
        <Router>
            <Grid container className={classes.main}>
                <Grid item xs={12}>
                    <MainAppbar
                        theme={theme}
                        changeTheme={changeTheme}
                        phrases={phrases}
                        language={language}
                        changeLanguage={changeLanguage} />
                </Grid>

                <Grid className={classes.content} item xs={12}>
                    <Routes>
                        <Route path={ROUTES.CALCULATOR}
                            element={<Calculator phrases={phrases} />} />


                        <Route path={ROUTES.BLOG} element={<Blog />} />


                        <Route path={ROUTES.HOME}
                            element={<Calculator phrases={phrases} />} />
                    </Routes>
                </Grid>
            </Grid>
        </Router>
    );
};

export default Main;