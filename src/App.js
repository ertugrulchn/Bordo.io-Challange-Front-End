import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryList from "./pages/Categories/CategoryList";
import AddCategory from "./pages/Categories/AddCategory";
import UpdateCategory from "./pages/Categories/UpdateCategory";
import OfferList from "./pages/Offers/OfferList";
import SubscriberList from "./pages/SubscriberList";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import SendEmail from "./pages/Email/SendEmail";
import SentMessages from "./pages/Email/SentMessages";
import Profile from "./pages/Authentication/Profile";
import AddOffer from "./pages/Offers/AddOffer";
import UpdateOffer from "./pages/Offers/UpdateOffer";

function App() {
  const [user, setUser] = useState({ Email: "", Password: "" });
  useEffect(() => {
    var localData = localStorage.getItem("userData");
    var parsedData = JSON.parse(localData);
    setUser(parsedData);
  }, []);

  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Offer */}
          <Route path="/offer" element={<OfferList />} />
          <Route path="/add-offer" element={<AddOffer />} />
          <Route path="/update-offer/:id" element={<UpdateOffer />} />
          {/* Categori */}
          <Route path="/Category" element={<CategoryList />} />
          <Route path="/add-Category" element={<AddCategory />} />
          <Route path="/update-Category/:id" element={<UpdateCategory />} />

          {/* Subscriber */}
          <Route path="/subscriber" element={<SubscriberList />} />
          
          {/* Email */}
          <Route path="/send-email" element={<SendEmail />} />
          <Route path="/sent-messages" element={<SentMessages />} />
          
          {/* Authentication */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ErrorPage */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
