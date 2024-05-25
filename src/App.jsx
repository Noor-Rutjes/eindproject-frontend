import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Necklace from './pages/necklace/Necklace.jsx';
import Paintings from "./pages/paintings/Paintings.jsx";
import Home from './pages/home/Home.jsx';
import './App.css';
import SignIn from "./pages/signIn/SignIn.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import Footer from "./components/footer/Footer.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);
    return (
        <>
            <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/paintings" element={<Paintings />} />
                        <Route path="/necklace" element={<Necklace />} />
                        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login"/>}/>
                        <Route path="/signin" element={<SignIn />}/>
                        <Route path="/signup" element={<SignUp />}/>
                        <Route path="/*" element={<NotFound />}/>
                        </Routes>
            <Footer />
        </>
    );
}

export default App;