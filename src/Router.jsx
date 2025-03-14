import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./Pages/SignIn";
import { HomePage } from "./components/HomePage";
import Layout from "./components/layout/Layout";
import { PrivateGuard } from "./guard/PrivategGuard";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import Blog from "./Pages/Blog";
import Cart from "./Pages/Cart";
import HotDeals from "./Pages/HotDeals";

export const AppRouter = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Header (Layout) */}
        <Route element={<Layout />}>

          {/* Rutas protegidas dentro del Layout */}
          <Route element={<PrivateGuard />}>
            <Route index element={<HomePage />} /> {/* Página principal */}
            <Route path="/hotdeals" element={<HotDeals/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Route>
        </Route>

        {/* Ruta de inicio de sesión sin Header */}
        <Route path="/login" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};
