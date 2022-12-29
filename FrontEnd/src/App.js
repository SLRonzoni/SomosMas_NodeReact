import React from "react";
import "./App.css";
import "./components/styles/styles.css";
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Login from './components/Login';
import LoginGoogle from './components/LoginGoogle';

import MercadoPagoCard from "./components/MercadoPagoCard";
import MercadoPagoTicket from "./components/MercadoPagoTicket";
import Stripe from "./components/Stripe";

import Home from './components/Home';
import Navbar from "./components/Navbar";

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

import ContactsAll from './components/ContactsAll';
import ContactForm from './components/ContactForm';

import DonationsAll from './components/DonationsAll';

import MessagesAll from './components/MessagesAll';

import MembersAll from './components/MembersAll';
import MembersCreate from './components/MembersCreate';
import MembersOne from './components/MembersOne';
import MembersUpdate from './components/MembersUpdate';

import NewsAll from './components/NewsAll';
import NewsAllPublic from './components/NewsAllPublic';
import NewsCreate from "./components/NewsCreate";
import NewsUpdate from "./components/NewsUpdate";

import PaymentMethod from "./components/PaymentMethod";

import RolesAll from "./components/RolesAll";
import RolesCreate from "./components/RolesCreate";
import RolesUpdate from "./components/RolesUpdate";

import TestimonialsAll from "./components/TestimonialsAll";
import TestimonialsPublic from "./components/TestimonialsPublic";
import TestimonialsCreate from './components/TestimonialsCreate';

import OrganizationsAll from "./components/OrganizationsAll";
import OrganizationsCreate from "./components/OrganizationsCreate";
import OrganizationsUpdate from "./components/OrganizationsUpdate";

import UsersAll from './components/UsersAll';
import Register from './components/Register';
import MyProfileUpdate from './components/UsersUpdate';

const App = () => {
 
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Switch>
        <>           
          <Route exact path="/" component={Home}/> 
          
          {/* BOTH */}
          <Route exact path="/auth/logout"component={Home}/>
          <Route exact path="/auth/login" component={Login}/>
          <Route path="/LoginGoogle" component={LoginGoogle}/>
          <Route path="/redes" component={LoginGoogle}/>
          <Route path='/searchResults'component={SearchResults}/>
          <Route path='/About'component={About}/>
            

          {/* USER */}
          <Route exact path="/auth/register" component={Register}/>
          <Route path="/contactForm" component={ContactForm}/>
          <Route exact path='/users/:id' component={MyProfileUpdate}/>
          <Route path='/ActivitiesPublicAll' component={ActivitiesPublicAll}/>
          <Route path='/NewsAllPublic' component={NewsAllPublic}/>
          <Route path='/PaymentMethod' component={PaymentMethod}/>
          <Route path='/TestimonialsCreate' component={TestimonialsCreate}/>
          <Route path='/TestimonialsPublic' component={TestimonialsPublic}/>
          <Route path='/Stripe' component={Stripe}/>
          <Route path='/MercadoPagoCard' component={MercadoPagoCard}/>
          <Route path='/MercadoPagoTicket' component={MercadoPagoTicket}/>
                  
          {/* ADMIN */}
          <Route path='/ActivitiesAll' component={ActivitiesAll}/>
          <Route path='/ActivitiesCreate' component={ActivitiesCreate}/>
          <Route exact path='/activities/update/:id' component={ActivitiesUpdate}/>

          <Route path='/CategoriesAll' component={CategoriesAll}/>
          <Route path='/CategoriesCreate' component={CategoriesCreate}/>
          <Route exact path='/categories/update/:id' component={CategoriesUpdate}/>
          <Route exact path='/categories/:id' component={CategoriesAll}/>

          <Route path='/CommentsAll' component={CommentsAll}/>
          <Route exact path='/comments/byUser/:user_id' component={CommentsAll}/>

          <Route path='/ContactsAll' component={ContactsAll}/>
          <Route path='/DonationsAll' component={DonationsAll}/>
          <Route path='/donations/createDonation' component={DonationsAll}/>

          <Route path='/MembersAll' component={MembersAll}/>
          <Route path='/MembersCreate' component={MembersCreate}/>
          <Route path='/MembersOne' component={MembersOne}/>
          <Route exact path='/members/update/:id' component={MembersUpdate}/>

          <Route path='/MessagesAll' component={MessagesAll}/>

          <Route path='/NewsAll' component={NewsAll}/>
          <Route path='/NewsCreate' component={NewsCreate}/>
          <Route exact path='/news/update/:id' component={NewsUpdate}/>

          <Route path='/RolesAll' component={RolesAll}/>
          <Route exact path='/RolesCreate' component={RolesCreate}/>
          <Route exact path='/roles/update/:id' component={RolesUpdate}/>

          <Route path='/TestimonialsAll' component={TestimonialsAll}/>

          <Route path="/OrganizationsAll" component={OrganizationsAll}/>
          <Route path='/OrganizationsCreate' component={OrganizationsCreate}/>
          <Route exact path='/organizations/update/:id' component={OrganizationsUpdate}/>

          <Route path='/UsersAll' component={UsersAll}/>              
        </>
      </Switch>
      
    </BrowserRouter>
  );  
};

export default App;









