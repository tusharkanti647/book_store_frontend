import './App.css';
import Footer from './components/footer/footer';
import Navbar from './components/header/Navbar';
import HomeMain from './components/home/HomeMain';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
      <Route path='/' element={<HomeMain />}></Route>
      </Routes>

      <Footer />
      
    </div>
  );
}

export default App;
