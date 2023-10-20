import logo from "./logo.svg";
import "./App.css";
import "./PostCard/PostModal.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SinglePost from "./PostCard/SinglePost";
import UserDetails from "./PostCard/UserDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SinglePost />}></Route>
        <Route path="/userdetails/:id" element={<UserDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
