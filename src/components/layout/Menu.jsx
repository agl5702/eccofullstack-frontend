import { useState, useRef, useEffect } from "react";
import { Box, List, Text, Button, Link } from "@chakra-ui/react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdBorderAll } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { FaAngleDown, FaFireAlt } from "react-icons/fa";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger
} from "@/components/ui/menu";
import { getAllCategories } from "@/services/requests/products";

export default function Menu() {
    const [homeOpen, setHomeOpen] = useState(false);
    const [shopOpen, setShopOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const homeTimeout = useRef(null);
    const shopTimeout = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleMouseEnter = (setOpen) => {
        if (homeTimeout.current) clearTimeout(homeTimeout.current);
        if (shopTimeout.current) clearTimeout(shopTimeout.current);
        setOpen(true);
    };

    const handleMouseLeave = (setOpen, timeoutRef) => {
        timeoutRef.current = setTimeout(() => setOpen(false), 300);
    };

    const currentPath = window.location.pathname;

    return (
        <Box
            w="100%"
            h="100px"
            alignItems="center"
            display="flex"
            flexDirection="row"
            bg="white"
            justifyContent="space-around"
            borderBottom="1px solid"
            borderColor="gray.200"
        >
            <Box display="flex" alignItems="center" mx={10}>
                <Box h={10} w={350} bg="green.400" borderRadius={6} display="flex" alignItems="center" justifyContent="center" mx={2}>
                    <MenuRoot>
                        <MenuTrigger asChild>
                            <Button
                                w="100%"
                                h="100%"
                                fontSize="20px"
                                variant="outline"
                                color="white"
                                outline="none"
                                size="sm"
                                border="none"
                                fontStyle="bold"
                                _hover={{ bg: "green.600" }}
                                _expanded={{ bg: "green.600" }}
                            >
                                <Box><MdBorderAll color="white" /></Box>
                                Browse All Categories
                                <Box><FaAngleDown /></Box>
                            </Button>
                        </MenuTrigger>
                        <MenuContent w="350px" bg="white" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} m="auto auto">
                            {categories.map((category, index) => (
                                <MenuItem key={index} color="black"  onClick={() => {
                                    localStorage.setItem("selectedCategory", category.name);
                                    window.location.href = "/shop";
                                }} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </MenuContent>
                    </MenuRoot>
                </Box>

                <List.Root color="black" display="flex" flexDirection="row" listStyle="none" fontWeight="500" mx={8} p={2}>
                    <List.Item mx={6} display="flex" alignItems="center">
                        <Link href="/" outline="none">
                            <Text fontSize="18px" color={currentPath === "/" ? "green.400" : "black"}>
                                Home
                            </Text>
                        </Link>
                    </List.Item>
                    <List.Item mx={6} display="flex" alignItems="center">
                        <Link href="/shop" outline="none">
                            <Text fontSize="18px" color={currentPath === "/shop" ? "green.400" : "black"}>
                                Shop
                            </Text>
                        </Link>
                    </List.Item>
                    <List.Item mx={6} display="flex" alignItems="center">
                        <Link href="/blog" outline="none">
                            <Text fontSize="18px" color={currentPath === "/blog" ? "green.400" : "black"}>
                                Blog
                            </Text>
                        </Link>
                    </List.Item>
                    <List.Item mx={6} display="flex" alignItems="center">
                        <Link href="/about" outline="none">
                            <Text fontSize="18px" color={currentPath === "/about" ? "green.400" : "black"}>
                                About
                            </Text>
                        </Link>
                    </List.Item>
                </List.Root>
            </Box>
        </Box>
    );
}
