import { Box, Image, Input, Button, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import S1 from "@/assets/banner3.png";
import { MdEmail } from "react-icons/md";

const images = [S1]; // Array con las imágenes

const SliderContact = () => {
  return (
    <Box maxW="80%" mx="auto" p="20px" borderRadius="20px" bg="white">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        style={{ borderRadius: "20px", overflow: "hidden" }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{ position: "relative" }}>
            <Image borderRadius="20px" backgroundSize="cover" minW="100%" maxH="400px" src={image} alt={`Imagen ${index}`} />
            
            {/* Contenedor del input a la izquierda */}
            <Box 
              position="absolute"
              top="80%"
              left="10%"  // Ajusta para moverlo más o menos a la izquierda
              transform="translate(0, -50%)"  // Solo centra verticalmente
              bg="rgb(255, 255, 255)"
              borderRadius="20px"
              w="60%"  // Ajustar el ancho del input
              maxW="350px"
              boxShadow="md"
            >
            

              <Flex align="center">
                <Box ml="10px">
                <MdEmail color="gray"/>

                </Box>
                <Input
                  placeholder="Enter your email"
                  flex="1"
                  mr={2}
                  bg="transparent"
                  border="none"
                  outline="none"
                  borderRadius="20px"
                  color="gray.700"
                  type="email"
                />
                <Button type="submit" bg="green.400" color="white" borderRadius="20px">Subscribe</Button>
              </Flex>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SliderContact;
