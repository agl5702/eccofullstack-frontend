import Header from "./Header";
import Menu from "./Menu";
import { Outlet } from "react-router-dom"; // Outlet renderiza el contenido de cada página
import { Box } from "@chakra-ui/react";
const Layout = () => {
  return (
    <>
      <Header /> {/* Se muestra en todas las páginas excepto Login */}
      <Menu/>
        <Box bg="white" minHeight="100vh" >
        <Outlet /> {/* Aquí se renderizan las páginas */}
        </Box>
    </>
  );
};

export default Layout;
