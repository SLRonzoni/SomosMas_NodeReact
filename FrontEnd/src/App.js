import React from "react";
import "./App.css";
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import LoginGoogle from './components/LoginGoogle';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import SearchResults from "./components/SearchResults";

import CategoriesAll from './components/CategoriesAll';
import CategoriesOne from './components/CategoriesOne';
import CategoriesCreate from './components/CategoriesCreate';
import CategoriesUpdate from './components/CategoriesUpdate';


function App() {
  return (  
  <BrowserRouter>
   <Switch>
    <>
    <div className="d-flex flex-column site-container">
      
      <header>
        <Header />
      </header>

      <main className="mt-3">
        <Route exact path="/" component={Home}/>       

        {/* BOTH */}
        <Route exact path="/auth/logout"component={Home}/>
        <Route exact path="/auth/login" component={Login}/>
        <Route exact path="/LoginGoogle" component={LoginGoogle}/>
        <Route exact path="/redes" component={LoginGoogle}/>
        <Route exact path='/searchResults'component={SearchResults}/>

        {/* USER */}
        <Route exact path="/auth/register" component={Register}/>
              
        {/* ADMIN */}
        <Route exact path='/CategoriesAll' component={CategoriesAll}/>
        <Route exact path='/categories/:id' component={CategoriesOne}/>
        <Route exact path='/CategoriesCreate' component={CategoriesCreate}/>
        <Route exact path='/categories/update/:id' component={CategoriesUpdate}/>
        <Route exact path='/categories/del/:id' component={CategoriesAll}/>

         
      </main>

      <footer className="footer">
        <Footer/>
      </footer>
 
    </div>
    </>
   </Switch>
  </BrowserRouter>
  );
}

export default App;
