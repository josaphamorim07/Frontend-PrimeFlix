import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Error from "./pages/Error";
import Favoritos from "./pages/Favoritos";
import Filme from "./pages/filme";
import Home from "./pages/Home";

const RouterApp = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route  path="/"  element={<Home/>} />
        <Route  path="/filme/:id"  element={<Filme/>} />
        <Route  path="/favoritos"  element={<Favoritos/>} />
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
};


export default RouterApp
