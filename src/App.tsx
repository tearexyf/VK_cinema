import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import type { AppDispatch } from "./store/store";
import { fetchCurrentUser } from "./store/authSlice";
import { HomePage } from "./pages/HomePage/HomePage";
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { GenresPage } from "./pages/GenresPage/GenresPage";
import { GenrePage } from "./pages/GenrePage/GenrePage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import { PrivateRoute } from "./components/PrivateRouter/PrivateRouter";
import { Header } from "./components/Header/Header";
import { AuthModal } from "./components/AuthModal/AuthModal";


function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <>
      <Header />
      <AuthModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genreName" element={<GenrePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </>
  )
}

export default App