import { Box, Text,Badge, Button, Card, HStack, Image,Link } from "@chakra-ui/react";
import perfilimg from "@/assets/perfil.png"
import { FaInstagram } from "react-icons/fa6";
import { FaGithub,FaTerminal,FaFacebook,FaLinkedin  } from "react-icons/fa";
import { HiStar } from "react-icons/hi";

function About() {
  return (
    <Box color="gray.700" p={6} maxW="800px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Acerca de Ecco FullStack
      </Text>
      <Text fontSize="md" mb={3}>
        Bienvenido a <strong>Ecco FullStack</strong>, un eCommerce desarrollado con el propósito de demostrar mis habilidades en desarrollo web. 
        Este proyecto no solo es una tienda en línea, sino una muestra integral de tecnologías backend y frontend aplicadas en un entorno real.
      </Text>
      <Text fontSize="lg" fontWeight="semibold" mt={4} mb={2}>
        🚀 ¿Qué abarca este proyecto?
      </Text>
      <Text fontSize="md">🔹 <strong>Backend Sólido</strong> – Desarrollo de APIs robustas y eficientes con autenticación segura.</Text>
      <Text fontSize="md">🔹 <strong>Integración de Pagos</strong> – Implementación de pasarelas de pago en línea con PayPal.</Text>
      <Text fontSize="md">🔹 <strong>React.js y Librerías Modernas</strong> – Consumo de APIs, manejo de estado y optimización del rendimiento.</Text>
      <Text fontSize="md">🔹 <strong>Seguridad y Autenticación</strong> – Implementación de JWT como método de autenticación.</Text>
      <Text fontSize="md" mt={4}>
        Este proyecto refleja mi capacidad para crear aplicaciones escalables, seguras y eficientes. Si te interesa colaborar o saber más, ¡contáctame!  
      </Text>
      <Box>
        <Card.Root border="none" flexDirection="row"   background="linear-gradient(45deg, #000428,rgb(38, 96, 147),rgb(78, 178, 228),rgb(124, 220, 188))"
        overflow="hidden" maxW="xxl">
            <Image
            objectFit="cover"
            maxW="200px"
            src={perfilimg}
            alt="Caffe Latte"
          />
        <Box>
          <Card.Body>
            <Card.Title color="gray.900" fontSize="22px" mb="2">Ángel Vásquez</Card.Title>
            <Card.Description fontSize="18px" color="gray.800">
              Soy un apasionado por la programación, que tiene como meta; superarme cada dia con diferentes retos, mientras tomo una taza de café
            </Card.Description>
            <HStack mt="4">
              <Badge colorPalette="blue">
                <HiStar color="yellow"/>
                Python
              </Badge>
              <Badge>
                <FaTerminal/>
                Linux
              </Badge>
              <Badge colorPalette="green">Github</Badge>
              <Badge colorPalette="orange">Café</Badge>
            </HStack>
            <Box display="flex" mt="15px" alignItems="center">
              <Box mx="10px">
                <Link href="https://www.instagram.com/angeldavidvasquezpedrozo/" fontSize="28px" color="pink">
                  <FaInstagram/>
                </Link>
              </Box>
              <Box mx="10px">
                <Link href="https://github.com/agl5702" fontSize="28px" color="black">
                  <FaGithub/>
                </Link>
              </Box>
              <Box mx="10px">
                <Link href="https://www.facebook.com/angelVasquez5702" fontSize="28px" color="blue.700">
                  <FaFacebook/>
                </Link>
              </Box>
              <Box mx="10px">
                <Link href="https://www.linkedin.com/in/angel-vasquez-pedrozo-221634297/" fontSize="28px" color="blue.700">
                  <FaLinkedin/>
                </Link>
              </Box>
            </Box>
          </Card.Body>
          <Card.Footer>
            <Button>Contáctame</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
      </Box>
    </Box>
  );
}

export default About;
