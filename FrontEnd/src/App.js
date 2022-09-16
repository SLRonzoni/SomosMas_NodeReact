import React from "react";
import "./App.css";
import {BrowserRouter,Switch,Route} from 'react-router-dom';


import Login from './components/Login';
import LoginGoogle from './components/LoginGoogle';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import SearchResults from "./components/SearchResults";

import ActivitiesAll from './components/ActivitiesAll';
import ActivitiesCreate from './components/ActivitiesCreate';
import ActivitiesUpdate from './components/ActivitiesUpdate';

import CategoriesAll from './components/CategoriesAll';
import CategoriesOne from './components/CategoriesOne';
import CategoriesCreate from './components/CategoriesCreate';
import CategoriesUpdate from './components/CategoriesUpdate';

import CommentsAll from './components/CommentsAll';

import ContactsAll from './components/ContactsAll';

import MessagesAll from './components/MessagesAll';

import MembersAll from './components/MembersAll';
import MembersCreate from './components/MembersCreate';
import MembersOne from './components/MembersOne';
import MembersUpdate from './components/MembersUpdate';

import NewsAll from './components/NewsAll';
import NewsCreate from "./components/NewsCreate";
import NewsUpdate from "./components/NewsUpdate";

import RolesAll from "./components/RolesAll";
import RolesCreate from "./components/RolesCreate";
import RolesUpdate from "./components/RolesUpdate";

import Contact from './components/Contact';
import UsersAll from './components/UsersAll';
// import UsersOne from './components/UsersOne';
import Register from './components/Register';
import EditUsers from './components/UsersUpdate';



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
        <Route exact path="/contacts" component={Contact}/>
              
        {/* ADMIN */}
        <Route exact path='/ActivitiesAll' component={ActivitiesAll}/>
        <Route exact path='/ActivitiesCreate' component={ActivitiesCreate}/>
        <Route exact path='/activities/update/:id' component={ActivitiesUpdate}/>

        <Route exact path='/CategoriesAll' component={CategoriesAll}/>
        <Route exact path='/categories/:id' component={CategoriesOne}/>
        <Route exact path='/CategoriesCreate' component={CategoriesCreate}/>
        <Route exact path='/categories/update/:id' component={CategoriesUpdate}/>
        <Route exact path='/categories/del/:id' component={CategoriesAll}/>

        <Route exact path='/CommentsAll' component={CommentsAll}/>
        <Route exact path='/comments/byUser/:user_id' component={CommentsAll}/>

        <Route exact path='/ContactsAll' component={ContactsAll}/>

        <Route exact path='/MembersAll' component={MembersAll}/>
        <Route exact path='/MembersCreate' component={MembersCreate}/>
        <Route exact path='/MembersOne' component={MembersOne}/>
        <Route exact path='/members/update/:id' component={MembersUpdate}/>

        <Route exact path='/MessagesAll' component={MessagesAll}/>

        <Route exact path='/NewsAll' component={NewsAll}/>
        <Route exact path='/NewsCreate' component={NewsCreate}/>
        <Route exact path='/news/update/:id' component={NewsUpdate}/>

        <Route exact path='/RolesAll' component={RolesAll}/>
        <Route exact path='/roles/create' component={RolesCreate}/>
        <Route exact path='/roles/update/:id' component={RolesUpdate}/>


        <Route exact path='/UsersAll' component={UsersAll}/>
        {/* <Route exact path='/users/:id' component={UsersOne}/> */}
        <Route exact path='/users/update/:id' component={EditUsers}/>
       

         
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
