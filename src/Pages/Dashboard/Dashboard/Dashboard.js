import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Route, Switch, useRouteMatch } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from '../../../images/logo.png';
import { makeStyles } from '@mui/styles';
import AdminRoute from '../../Authentication/AdminRoute/AdminRoute';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import DashboardHome from '../DashboardHome/DashboardHome';
import ManageProducts from '../ManageProducts/ManageProducts';
import ManageOrders from '../ManageOrders/ManageOrders';
import Payment from '../Payment/Payment';
import MyOrders from '../MyOrders/MyOrders';
import ReviewPlace from '../ReviewPlace/ReviewPlace';
import AddProduct from '../AddProduct/AddProduct';
import Home from '../../Home/Home/Home';

const drawerWidth = 240;

const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const { admin, logout } = useAuth();

    const useStyle = makeStyles({
        mobileNavItem: {
            textDecoration: 'none',
            color: '#000'
        }
    });

    const { mobileNavItem: dashboardNavItem } = useStyle();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <img src={logo} alt="" style={{ width: '100%' }} />
            </Toolbar>
            <Divider />

            <List>
                <ListItem button>
                    <ListItemText>
                        <Link className={dashboardNavItem} to="/"><Button color="inherit">Back to Main Site</Button></Link>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText>
                        <Link className={dashboardNavItem} to={`${url}`}><Button color="inherit">Dashboard</Button></Link>
                    </ListItemText>
                </ListItem>
                <Divider />
                {
                    admin ?
                        <>
                            <ListItem button>
                                <ListItemText>
                                    <Link className={dashboardNavItem} to={`${url}/manageProducts`}><Button color="inherit">Manage Products</Button></Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText>
                                    <Link className={dashboardNavItem} to={`${url}/addProduct`}><Button color="inherit">Add Product</Button></Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText>
                                    <Link className={dashboardNavItem} to={`${url}/manageOrders`}><Button color="inherit">Manage Orders</Button></Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText>
                                    <Link className={dashboardNavItem} to={`${url}/makeAdmin`}><Button color="inherit">Make Admin</Button></Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                        </>
                        :
                        <>
                            <ListItem button>
                                <ListItemText>
                                    <Link className={dashboardNavItem} to={`${url}/payment`}><Button color="inherit">Make Payment</Button></Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText>
                                    <Link className={dashboardNavItem} to={`${url}/myOrders`}><Button color="inherit">My Orders</Button></Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText>
                                    <Link className={dashboardNavItem} to={`${url}/addReview`}><Button color="inherit">Add Review</Button></Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                        </>
                }
                <ListItem button>
                    <ListItemText>
                        <Button onClick={logout} color="inherit">Logout</Button>
                    </ListItemText>
                </ListItem>
                <Divider />
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route exact path={path}>
                        <DashboardHome></DashboardHome>
                    </Route>
                    <Route path={`${path}/payment`}>
                        <Payment></Payment>
                    </Route>
                    <Route path={`${path}/myOrders`}>
                        <MyOrders></MyOrders>
                    </Route>
                    <Route path={`${path}/addReview`}>
                        <ReviewPlace></ReviewPlace>
                    </Route>
                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageProducts`}>
                        <ManageProducts></ManageProducts>
                    </AdminRoute>
                    <AdminRoute path={`${path}/addProduct`}>
                        <AddProduct></AddProduct>
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageOrders`}>
                        <ManageOrders></ManageOrders>
                    </AdminRoute>
                </Switch>
            </Box>
        </Box>
    );
};

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;