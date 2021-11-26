import './App.css';
import Navigation from './Pages/Shared/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Products from './Pages/Products/Products/Products';
import Login from './Pages/Authentication/Login/Login';
import AuthProvider from './contexts/AuthProvider';
import Register from './Pages/Authentication/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './Pages/Authentication/PrivateRoute/PrivateRoute';
import BuyProduct from './Pages/Products/BuyProduct/BuyProduct';
import Footer from './Pages/Shared/Footer/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute path="/buyProduct/:productId">
            <BuyProduct></BuyProduct>
          </PrivateRoute>
        </Switch>
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
