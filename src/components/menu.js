import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
// import axios from 'axios';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, CssBaseline, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../reducers/authReducer';
import { PICK_UP } from '../reducers/alertReducer';
import { 
   FaUser, 
   // FaUsers 
} from 'react-icons/fa';
import { HiViewGrid } from 'react-icons/hi';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ModalCommponent from './formModal/modalComponent';
import { useStyles } from './styles';

const listMenu = [
   { id: 0, title: 'Home', url: '/home', icon: <FaUser size={25} /> },
   { id: 1, title: 'Works', url: '/works', icon: <HiViewGrid size={25} /> },
   // { id: 2, title: 'Users', url: '/users', icon: <FaUsers size={25} /> },
]

const Menu = ({ children }) => {
   const [open, setOpen] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [type, setType] = useState('');
   const [titleMenu, setTitleMenu] = useState('');

   const dispatch = useDispatch();
   const userData = useSelector(state => state.authReducer);
   useEffect(() => {
      handleTitle();
   }, [children]);

   useEffect(() => {
      const checkLoggedIn = async () => {
         let auth = JSON.parse(localStorage.getItem("auth"));
         dispatch({
            type: LOGIN_USER, payload: {
               token: auth.token,
               user: auth.user,
            }
         })
      };
      checkLoggedIn();
      // eslint-disable-next-line
   }, []);

   const theme = useTheme();
   let history = useHistory();

   const handleTitle = () => {
      const urlActual = window.location.pathname;
      switch (urlActual) {
         case '/home':
            setTitleMenu('Home')
            break;
         case '/works':
            setTitleMenu('Works')
            break;

         default:
            setTitleMenu('Landing')
      }
   }

   const getOut = () => {
      localStorage.setItem("auth", "");
      dispatch({ type: LOGIN_USER, payload: { token: undefined, user: undefined } });
      setOpen(false);
      dispatch({ type: PICK_UP, payload: { open: true, severity: 'info', message: `Gracias` } });
   };

   const handleModal = (type) => {
      setOpenModal(true)
      setType(type)
   };

   const handleList = (item) => {
      setTitleMenu(item.title)
      history.push(item.url);
   };

   // const outService = () => {
   //    dispatch({ type: PICK_UP, payload: { open: true, severity: 'warning', message: `Fuera de Servicio` } })
   // }

   const onlyEmail = (email) => {
      const indice = email.indexOf('@');
      return email.substring(0, indice);      
   }

   const classes = useStyles();

   return (
      <div className={classes.root}>
         <ModalCommponent openModal={openModal} setOpenModal={setOpenModal} type={type} setType={setType} />
         <CssBaseline />
         <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
               [classes.appBarShift]: open,
            })}
         >
            {userData.token ? (
               <Toolbar>
                  <IconButton
                     color="primary"
                     aria-label="open drawer"
                     onClick={() => setOpen(true)}
                     edge="start"
                     className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                     })}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title} color="primary" noWrap>
                     {titleMenu}
                  </Typography>
                  <Button onClick={() => getOut()} color="primary" className={classes.btn}>Salir</Button>
               </Toolbar>
            ) : (
               <Toolbar>
                  <Typography variant="h6" className={classes.title} color="primary" noWrap>
                     {titleMenu}
                  </Typography>
                  {/* <Button onClick={() => outService()} color="primary" className={classes.btn}>Registrate</Button> */}
                  <Button onClick={() => handleModal('LogIn')} color="primary" className={classes.btn}>Inicia Sesion</Button>
               </Toolbar>
            )}

         </AppBar>
         {userData.token ? (
            <Drawer
               variant="permanent"
               className={clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
               })}
               classes={{
                  paper: clsx({
                     [classes.drawerOpen]: open,
                     [classes.drawerClose]: !open,
                  }),
               }}
            >
               <div className={classes.toolbar}>
                  <Typography style={{ paddingLeft: 20 }} variant="h6" className={classes.title} color="primary" noWrap>
                     {userData.user ? onlyEmail(userData.user) : 'Rootstack'}
                  </Typography>
                  <IconButton onClick={() => setOpen(false)}>
                     {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
               </div>
               <Divider />
               <List style={{ paddingLeft: 8 }}>
                  {listMenu.map(item => (
                     <ListItem button key={item.id} onClick={() => handleList(item)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                     </ListItem>
                  ))}
               </List>
               <Divider />
            </Drawer>
         ) : (
            <></>
         )}
         <main className={classes.content}>
            {/* necessary for content to be below app bar */}
            <div className={classes.toolbar} />
            {children}
         </main>
      </div>
   );
}

export default Menu;