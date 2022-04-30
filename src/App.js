import './App.css';
import './styles/darkmode.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Glance from './components/Glance';
import Search from './components/Search';
import About from './components/About';
import DarkmodeToggle from './components/DarkmodeToggle';

function App() {
  const [darkmode, setDarkmode] = useState(false);

  const toggleDarkMode = (e) => {
    if (darkmode === true) {
      setDarkmode(false);
    } else if (darkmode === false) {
      setDarkmode(true);
    }
    e.target.blur();
  };

  return (
    <BrowserRouter>
      <Nav darkmode={darkmode} />
      <Routes>
        <Route path="/" element={<Glance darkmode={darkmode} />} />
        <Route path="/search" element={<Search darkmode={darkmode} />} />
        <Route path="/about" element={<About darkmode={darkmode} />} />
      </Routes>
      <DarkmodeToggle toggleDarkMode={toggleDarkMode} />
    </BrowserRouter>
  );
}
export default App;
