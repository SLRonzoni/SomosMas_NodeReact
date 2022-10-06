import React from "react";
import "./App.css";
import {BrowserRouter,Switch,Route} from 'react-router-dom';


import Login from './components/Login';
import LoginGoogle from './components/LoginGoogle';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import About from './components/About';
import SearchResults from "./components/SearchResults";

import ActivitiesAll from './components/ActivitiesAll';
import ActivitiesPublicAll from './components/ActivitiesPublicAll';
import ActivitiesCreate from './components/ActivitiesCreate';
import ActivitiesUpdate from './components/ActivitiesUpdate';

import CategoriesAll from './components/CategoriesAll';
import CategoriesCreate from './components/CategoriesCreate';
import CategoriesUpdate from './components/CategoriesUpdate';

import CommentsAll from './components/CommentsAll';
import CommentsPublic from './components/CommentsPublic';

import ContactsAll from './components/ContactsAll';

import MessagesAll from './components/MessagesAll';

import MembersAll from './components/MembersAll';
import MembersCreate from './components/MembersCreate';
import MembersOne from './components/MembersOne';
import MembersUpdate from './components/MembersUpdate';

import NewsAll from './components/NewsAll';
import NewsAllPublic from './components/NewsAllPublic';
import NewsCreate from "./components/NewsCreate";
import NewsUpdate from "./components/NewsUpdate";

import RolesAll from "./components/RolesAll";
import RolesCreate from "./components/RolesCreate";
import RolesUpdate from "./components/RolesUpdate";

import TestimonialsAll from "./components/TestimonialsAll";
import TestimonialsPublic from "./components/TestimonialsPublic";

import OrganizationsAll from "./components/OrganizationsAll";
import OrganizationsCreate from "./components/OrganizationsCreate";
import OrganizationsUpdate from "./components/OrganizationsUpdate";

import ContactForm from './components/ContactForm';

import UsersAll from './components/UsersAll';
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
        <Route exact path='/About'component={About}/>
        

        {/* USER */}
        <Route exact path="/auth/register" component={Register}/>
        <Route exact path="/contactForm" component={ContactForm}/>
        <Route exact path='/ActivitiesPublicAll' component={ActivitiesPublicAll}/>
        <Route exact path='/CommentsPublic' component={CommentsPublic}/>
        <Route exact path='/TestimonialsPublic' component={TestimonialsPublic}/>
        <Route exact path='/NewsAllPublic' component={NewsAllPublic}/>

              
        {/* ADMIN */}
        <Route exact path='/ActivitiesAll' component={ActivitiesAll}/>
        <Route exact path='/ActivitiesCreate' component={ActivitiesCreate}/>
        <Route exact path='/activities/update/:id' component={ActivitiesUpdate}/>

        <Route exact path='/CategoriesAll' component={CategoriesAll}/>
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

        <Route exact path='/TestimonialsAll' component={TestimonialsAll}/>

        <Route exact path="/OrganizationsAll" component={OrganizationsAll}/>
        <Route exact path='/OrganizationsCreate' component={OrganizationsCreate}/>
        <Route exact path='/organizations/:id' component={OrganizationsUpdate}/>

        <Route exact path='/UsersAll' component={UsersAll}/>
       
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
