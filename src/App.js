import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn'; 
import PostApp from './PostApp';
import Nav from './Nav';
import Agency from './Agency';
import NavA from './NavA';
import ProfilePage from './ProfilePage';
import Test from './Test';
import ProfileA from './ProfileA';



function App() {
  return (
    <>
  
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Post" element={<PostApp />}  />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Agency" element={<Agency />} />
        <Route path="/NavA" element={<NavA />} />
        <Route path="/Profile" element={<ProfilePage />}/>
        <Route path= "/Test" element={<Test />} />
        <Route  path="/ProfileA" element={<ProfileA />} />
       

        </Routes>

       
       
  
 
  
    </>

  );
}

export default App;
