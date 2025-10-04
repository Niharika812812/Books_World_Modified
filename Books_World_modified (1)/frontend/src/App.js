import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddEditBook from './pages/AddEditBook';

function Navbar(){
  const token = localStorage.getItem('token');
  const name = JSON.parse(localStorage.getItem('user'))?.name;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">Books World</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            { token ? <>
              <li className="nav-item"><Link className="nav-link" to="/add">Add Book</Link></li>
              <li className="nav-item nav-link">Hi, {name}</li>
              <li className="nav-item"><a className="nav-link" href="#" onClick={()=>{localStorage.clear(); window.location='/';}}>Logout</a></li>
            </> : <>
              <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddEditBook />} />
          <Route path="/edit/:id" element={<AddEditBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
