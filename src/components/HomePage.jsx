import { useState, useEffect } from "react";
import { loadScript } from "@paypal/paypal-js";
import { apiCreateOrderPaypal, apiOnApprovePaypal } from "../services/apiPaypal";
import { getAllCategories } from "@/services/requests/products"; // Importamos la función para obtener categorías
import ImageSlider from "./layout/Slider";
import { Box, Text, List } from "@chakra-ui/react";
import { CardCustom, CardMiddle } from "./layout/Card";
import CategorySlider from "./layout/CardSlider";
import SliderContact from "./layout/SliderContact";
import { Footer } from "./layout/Footer";
import img1 from "@/assets/freco2.avif"
import img2 from "@/assets/desayuno.jpg"
import img3 from "@/assets/organico.jpg"


export const HomePage = () => {
    const [categorias, setCategorias] = useState([]); // Estado para las categorías

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const token = "tu_token_aqui"; // Reemplaza con el token real si es necesario
                const data = await getAllCategories(token);
                setCategorias(data); // Guardamos las categorías en el estado
            } catch (error) {
                console.error("Error obteniendo categorías:", error);
            }
        };

        fetchCategorias();
    }, []);

    return (
        <Box bg="white">
            <Box p="20px" bg="white">
                <ImageSlider />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-around">
                <Text color="gray.700" fontWeight="700" fontSize="26px">Featured Categories</Text>
                <List.Root color="black" display="flex" flexDirection="row" listStyle="none" mx={6} p={2}>
                    <List.Item mx={2} display="flex" alignItems="center">
                        <Box fontSize="18px">
                            <Text fontSize="18px" color="gray" fontWeight="500" fontStyle="italic">cart</Text>
                        </Box>
                    </List.Item>
                    <List.Item mx={2} display="flex" alignItems="center">
                        <Box>
                            <Text fontSize="18px" color="gray" fontWeight="500" fontStyle="italic">profile</Text>
                        </Box>
                    </List.Item>
                </List.Root>
            </Box>
            <CategorySlider/>
            <Box w="100%" display="flex" justifyContent="space-around">
                <CardMiddle title="Fresh and clean every day with our products" image={img1}/>
                <CardMiddle title="Make your Breakfast Healthy and Easy" image={img2} />
                <CardMiddle title="The best Organic Products Online" image={img3}/>
            </Box>
            <SliderContact/>
            <Box>
                <Footer/>
            </Box>
            
        </Box>
    );
};
