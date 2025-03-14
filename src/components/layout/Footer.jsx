import { Box, Text, Link, Image, List, Heading, VStack, HStack } from "@chakra-ui/react";
import { CardH } from "./Card";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { TbTruckReturn,TbClockHour7 } from "react-icons/tb";
import { FaRegAddressBook } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdOutlineAttachEmail } from "react-icons/md";
import ImgLogo from "../../assets/logo.png"

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" p="30px">
      {/* Sección de Tarjetas */}
      <HStack justify="space-around" mb="40px">
        <CardH icon={<CiDeliveryTruck color="green" />} bgColor="white" title="Free delivery" />
        <CardH icon={<IoPricetagOutline color="green" />} bgColor="white" title="Best prices & offers" />
        <CardH icon={<BiSolidOffer color="green" />} bgColor="white" title="Great daily deal" />
        <CardH icon={<TbTruckReturn color="green" />} bgColor="white" title="Easy returns" />
      </HStack>

      {/* Contenido del Footer */}
      <Box maxW="1200px" mx="auto" display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
        {/* Sección de información */}
        <VStack align="flex-start" maxW="300px" mb="30px">
          <Image src={ImgLogo} boxSize="150px" alt="logo"/>
          <Text fontSize="lg" color="gray.700">Eccomerce Fullstack</Text>
          <List.Root spacing={2} fontSize="sm" color="black" listStyle="none">
            <List.Item>
              <Image src="/assets/imgs/theme/icons/icon-location.svg" boxSize="16px" display="inline" mr="8px" />
              <Box display="flex" alignItems="center">
                <Box mx="2px">
                  <FaRegAddressBook/>
                </Box>
                  <strong>Address:</strong> &nbsp; Colombia, Cesar, Valledupar
              </Box>
            </List.Item>
            <List.Item>
                <Box display="flex" alignItems="center">
                    <Box mx="2px">
                      <IoIosCall/>
                    </Box>
                    <strong>Call Us: </strong> &nbsp;  (+57) - 3015042331
                </Box>
            </List.Item>
            <List.Item>
              <Box display="flex" alignItems="center">
                <Box mx="2px">
                  <MdOutlineAttachEmail/>
                </Box>
                <strong>Email: </strong> &nbsp; eccofullstack@gmail.com
              </Box>
            </List.Item>
            <List.Item>
                <Box display="flex"alignItems="center">
                  <Box mx="2px">
                    <TbClockHour7/>
                  </Box>
                  <strong>Hours: </strong> &nbsp; 8:00 - 18:00, Mon - Sat
                </Box>
            </List.Item>
          </List.Root>
        </VStack>

        {/* Secciones de enlaces */}
        <Box color="black" display="flex">
          <FooterLinks title="Company" links={["About Us", "Delivery Information", "Privacy Policy", "Terms & Conditions", "Contact Us", "Support Center", "Careers"]} />
          <FooterLinks title="Account" links={["Sign In", "View Cart", "My Wishlist", "Track My Order", "Help Ticket", "Shipping Details", "Compare products"]} />
          <FooterLinks title="Corporate" links={["Become a Vendor", "Affiliate Program", "Farm Business", "Farm Careers", "Our Suppliers", "Accessibility", "Promotions"]} />
          <FooterLinks title="Popular" links={["Milk & Flavoured Milk", "Butter and Margarine", "Eggs Substitutes", "Marmalades", "Sour Cream and Dips", "Tea & Kombucha", "Cheese"]} />
        </Box>

        {/* Sección de Instalación de la App */}
        <VStack align="flex-start" maxW="250px">
          <Heading as="h4" fontSize="md" color="black">Install App</Heading>
          <Text fontSize="sm" color="gray.700">From App Store or Google Play</Text>
          <HStack>
            <Link><Image src="https://arde.io/wp-content/uploads/2018/07/certificat-app-store-google-play.png"/></Link>
          </HStack>
          <Text fontSize="sm" mt="10px" color="gray.700">Secured Payment Gateways</Text>
          <Image src="https://support.arturia.com/hc/article_attachments/18028411705628" alt="Payment Methods" />
        </VStack>
      </Box>
    </Box>
  );
};

// Componente reutilizable para las secciones de enlaces
const FooterLinks = ({ title, links }) => (
  <VStack align="flex-start" minW="150px" mb="30px">
    <Heading as="h4" fontSize="md">{title}</Heading>
    <List.Root spacing={2} fontSize="sm">
      {links.map((link, index) => (
        <List.Item key={index} listStyle="none" p="10px">
          <Link href="#" color="gray.700" _hover={{ color: "blue.700", textDecoration: "underline" }}>
            {link}
          </Link>
        </List.Item>
      ))}
    </List.Root>
  </VStack>
);
