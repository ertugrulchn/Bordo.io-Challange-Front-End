import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategorieList from "./pages/Categories/CategorieList";
import CategorieEdit from "./pages/Categories/CategorieEdit";
import OfferList from "./pages/OfferList";
import SubscriberList from "./pages/SubscriberList";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState({ Email: "", Password: "" });
  useEffect(() => {
    var localData = localStorage.getItem("userData");
    var parsedData = JSON.parse(localData);
    setUser(parsedData);
  }, []);

  function LoggedIn(props) {
    if (user == null) {
      return (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      );
    }
  }

  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {LoggedIn}
          <Route path="/offer" element={<OfferList />} />
          <Route path="/categorie" element={<CategorieList />} />
          <Route path="/categorie/edit/:Id" element={<CategorieEdit />} />
          <Route path="/subscriber" element={<SubscriberList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
