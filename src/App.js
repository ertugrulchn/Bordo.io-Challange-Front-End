import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import CategoryList from "./pages/Categories/CategoryList";
import AddCategory from "./pages/Categories/AddCategory";
import UpdateCategory from "./pages/Categories/UpdateCategory";

import SendEmail from "./pages/Email/SendEmail";
import SentMessages from "./pages/Email/SentMessages";

import Profile from "./pages/Authentication/Profile";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";

import OfferList from "./pages/Offers/OfferList";
import AddOffer from "./pages/Offers/AddOffer";
import UpdateOffer from "./pages/Offers/UpdateOffer";

import SubscriberList from "./pages/Subscribers/SubscriberList";
import AddSubscriber from "./pages/Subscribers/AddSubscriber";
import UpdateSubscriber from "./pages/Subscribers/UpdateSubscriber";

function App() {
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

          {/* Category */}
          <Route path="/Category" element={<CategoryList />} />
          <Route path="/add-Category" element={<AddCategory />} />
          <Route path="/update-Category/:id" element={<UpdateCategory />} />

          {/* Subscriber */}
          <Route path="/subscriber" element={<SubscriberList />} />
          <Route path="/add-subscriber" element={<AddSubscriber />} />
          <Route path="/update-subscriber/:id" element={<UpdateSubscriber />} />

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
