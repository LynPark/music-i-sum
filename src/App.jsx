import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Mypage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import PrivateRoute from "./components/PrivateRoute";
import MyRatings from "./pages/MyRatings";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <Mypage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage/ratings"
          element={
            <PrivateRoute>
              <MyRatings />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
