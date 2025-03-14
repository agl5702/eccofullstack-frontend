import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getAllCategories } from "@/services/requests/products"; // Importamos la función para obtener categorías
import { CardCustom } from "./Card"; // Asegúrate de importar tu componente correctamente

const CategorySlider = () => {
    const [categorias, setCategorias] = useState([]);

    // Lista de colores claros (puedes modificarla a tu gusto)
    const colors = ["green.100", "yellow.100", "red.100", "blue.100", "purple.100"];

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const token = "tu_token_aqui"; // Reemplaza con el token real si es necesario
                const data = await getAllCategories(token);
                setCategorias(data);
            } catch (error) {
                console.error("Error obteniendo categorías:", error);
            }
        };

        fetchCategorias();
    }, []);

    return (
        <Box maxW="80%" mx="auto" mt={5} position="relative">
            <Swiper
                slidesPerView={7} 
                spaceBetween={15} 
                navigation={true} 
                loop={true} 
                modules={[Navigation]}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    480: { slidesPerView: 3 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 7 },
                }}
            >
                {categorias.length > 0 ? (
                    categorias.map((categoria, index) => (
                        <SwiperSlide key={index}>
                            <CardCustom 
                                image={categoria.image 
                                    ? `https://eccofullstack.onrender.com${categoria.image}`  
                                    : "https://img.freepik.com/foto-gratis/mostrando-carro-carro-compras-linea-signo-grafico_53876-133967.jpg"} 
                                title={categoria.name || "Sin Nombre"} 
                                bgColor={colors[index % colors.length]} // Asigna el color cíclicamente
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <p>Cargando categorías...</p>
                    </SwiperSlide>
                )}
            </Swiper>
        </Box>
    );
};

export default CategorySlider;
