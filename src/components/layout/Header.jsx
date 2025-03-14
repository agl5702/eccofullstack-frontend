import { useState, useEffect } from "react";
import { Box, Text, Input, Image, Link, Button } from "@chakra-ui/react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { getAllShopItems } from "@/services/requests/shop";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

import logo from "@/assets/logo.png";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await getAllShopItems(token);
        if (response.items) {
          const totalAmount = response.items.reduce(
            (sum, item) => sum + item.amount,
            0
          );
          setCartCount(totalAmount);
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      localStorage.setItem("searchQuery", searchTerm); // Guarda el término en localStorage
      window.location.href = "/shop"; // Redirige a /shop
    }
  };

  return (
    <Box
      w="100%"
      h="100px"
      alignItems="center"
      display="flex"
      flexDirection="row"
      bg="white"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Box display="flex" alignItems="center">
        <Link href="/" outline="none"  textDecoration="none">
          <Image w="150px" src={logo} />
        </Link>
        <Link href="/" outline="none" textDecoration="none">
          <Text
            fontSize="28px"
            fontWeight="bold"
            color="green.500"
            fontStyle="italic"
          >
            Ecco Fullstack
          </Text>
        </Link>
        
      </Box>

      <Box display="flex" alignItems="center" mx={10}>
        <Box
          h={10}
          w={500}
          borderRadius={6}
          pr={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx={2}
          border="1px solid"
          borderColor="gray"
        >
          <Input
            w="sm"
            fontSize={12}
            color="black"
            h="25px"
            mx="10px"
            p="0px"
            border="none"
            outline="none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch} // Detecta Enter
          />
          <Box m="20px" borderRadius="5px">
            <CiSearch color="black" />
          </Box>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" mx={6}>
        <Link href="/cart" outline="none">
          <Box fontSize="22px" position="relative">
            <CiShoppingCart color="black" />
            {cartCount > 0 && (
              <Box
                position="absolute"
                top="-5px"
                right="-10px"
                bg="red.500"
                color="white"
                fontSize="12px"
                fontWeight="bold"
                borderRadius="full"
                w="18px"
                h="18px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {cartCount}
              </Box>
            )}
          </Box>
          <Text color="black" fontSize="18px">
            Cart
          </Text>
        </Link>

        <Box display="flex" alignItems="center" mx={4}>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button size="sm">
                <GoPerson color="black" fontSize="22px" />
                Profile
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem
                value="logout"
                onClick={() => {
                  localStorage.removeItem("token"); // Elimina el token
                  window.location.href = "/login"; // Redirige a la página de login
                }}
              >
                Logout
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Box>
      </Box>
    </Box>
  );
}
