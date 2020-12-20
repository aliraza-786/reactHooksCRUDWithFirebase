import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm  from "./Component/ContactForm";
import Contacts from './Component/Contacts';
import Counter from './Component/counter.js';



function App() {


  return (
    <>
      <ContactForm />
      <Contacts/>     
      {/* <Counter/> */}
    </>
  );
}

export default App;