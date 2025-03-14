import { Box, Image, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import S1 from "@/assets/carro2.jpg";
import S2 from "@/assets/carro.jpg";

const images = [
  { src: S1, text: "Bienvenido a nuestra tienda" },
  { src: S2, text: "Descubre las mejores ofertas" }
];

const ImageSlider = () => {
  return (
    <Box maxW="80%" mx="auto" borderRadius="20px" overflow="hidden" position="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <Box position="relative">
              {/* Corregido: Ahora `src={item.src}` */}
              <Image borderRadius="20px" w="100%" maxH="600px" src={item.src} alt={`Imagen ${index + 1}`} />
              <Text 
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontSize="52px"
                fontWeight="bold"
                bg="rgba(0, 0, 0, 0.01)"
                p={3}
                borderRadius="none"
                outline="none"
                textAlign="center"
              >
                {item.text}
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;
