import './App.css';
import AboutBook from './components/bookDetals/AboutBook';
import Footer from './components/footer/footer';
import Navbar from './components/header/Navbar';
import HomeMain from './components/home/HomeMain';

import { Routes, Route } from "react-router-dom";
import SignUp from './components/signUP_signIn/signUp';
import SignIn from './components/signUP_signIn/signIn';
import MainBooksPage from './components/books/MainBookstPage';
import Basket from './components/basket/Basket';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
      <Route path='/' element={<HomeMain />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/signIn' element={<SignIn />}></Route>
      <Route path='/aboutbook/:id' element={<AboutBook />}></Route>
      <Route path='/books' element={<MainBooksPage />}></Route>
      <Route path="/basket" element={<Basket />}></Route>
      </Routes>

      <Footer />
      
    </div>
  );
}

export default App;
