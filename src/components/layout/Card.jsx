import { Button, Card, Image, Text, Box, Badge,HStack,Dialog,Portal,CloseButton } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiStar } from "react-icons/hi2";
import { Toaster, toaster } from "@/components/ui/toaster";
import { addShopItems } from "@/services/requests/shop";
import { useState } from "react"


export const CardCustom = ({ image, title, bgColor }) => {
  return (
    <Card.Root maxW="160px" maxH="220px" minH="220px" overflow="hidden"
      alignContent="center" alignItems="center" bg={bgColor} border="none"
      m="30px"
      _hover={{ cursor: "pointer", scale: 1.03, shadow: "sm" }}
    >
      <Image mt="20px" w="100px" minH="80px" src={image} alt={title} />
      <Card.Body gap="1" fontSize="14px" textAlign="center" color="gray.700">
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card.Root>
  );
};

export const CardMiddle = ({ image, title }) => {
  return (
    <Card.Root minW="490px" maxW="490px" minH="280px" maxH="280px" overflow="hidden"
      alignContent="center" alignItems="center" justifyContent="center" bg="gray.100" border="none"
      m="30px"
      _hover={{ cursor: "pointer", scale: 1.03, shadow: "sm" }}
    >
      <Image w="100%" minH="100%" src={image} alt={title} zIndex="1" />
      <Card.Body m={0} p={0} gap="1" position="absolute" zIndex="2" fontSize="14px" textAlign="center" color="white">
        <Card.Title color="white" fontSize="28px" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" >{title}</Card.Title>
      </Card.Body>
      <Button position="absolute" bottom={0} my="10px" zIndex="3" _hover={{bg:"orange.300"}}>
        Shop now <FaArrowRight color="green" />
      </Button>
    </Card.Root>
  );
};

export const CardH = ({ title, bgColor, icon }) => {
  return (
    <Card.Root
      minW="300px"
      maxW="280px"
      maxH="150px"
      minH="150px"
      overflow="hidden"
      bg={bgColor}
      border="none"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{ cursor: "pointer", scale: 1.03, shadow: "sm" }}
    >
      <Card.Body 
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        color="gray.700"
      >
        <Box fontSize="54px">{icon}</Box>
        <Card.Title fontSize="16px">{title}</Card.Title>
      </Card.Body>
    </Card.Root>
  );
};

export const CardShop = ({ image, id, title, price, calification, onAddToCart, labels = [] }) => {
  const handleAddToCart = () => {
    onAddToCart({ id, title, price, image });
    toaster.create({ description: "Product added to cart", type: "success" });
  };

  const badgeColors = {
    "Hot": "orange",
    "New": "green",
    "Sale": "blue",
    "Best sell": "pink"
  };

  return (
    <Box>
      <Toaster />
      <Card.Root m="20px" minW="250px" maxW="250px" maxH="400px" minH="400px" overflow="hidden"
        bg="white" border="1px solid" borderColor="gray.200"
        _hover={{ cursor: "pointer", shadow: "sm", boxShadow:"0px 4px 10px rgba(226, 228, 226, 0.5)", borderColor:"green.100" }}
      >
        {/* Renderiza solo los badges que están en labels */}
        <Box justifyContent="flex-start" mt={2} mx={2} display="flex" alignItems="center">
          {Array.isArray(labels) && labels.map((label, index) => (
            <Badge key={index} mx="2px" color="white" variant="solid" bg={badgeColors[label] || "gray"}>
              {label}
            </Badge>
          ))}
        </Box>

        <Box display="flex" justifyContent="center">
          <Image mt="20px" w="180px" minH="180px" maxH="180px" src={image} alt={title} />
        </Box>
        <Card.Body gap="1" fontSize="14px" alignItems="start" color="gray.700">
          <Card.Title w="100%" textAlign="start">{title}</Card.Title>
          <Box display="flex" alignItems="center">
            <HiStar color="orange" />
            <Text>{calification}</Text>
          </Box>
        </Card.Body>
        <Card.Footer w="100%" display="flex" justifyContent="center" alignItems="center" gap="2">
          <Card.Title mr="15px" color="green.600">${price}</Card.Title>
          <Button onClick={handleAddToCart} bg="green.100" color="green.600" _hover={{bg:"green.600", color:"white"}}>
            <MdOutlineShoppingCart /> Add
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};



export const CardBlog = ({ image, title, content }) => {
  const [open, setOpen] = useState(false);
  const truncatedContent = content.length > 100 ? content.substring(0, 100) + "..." : content;

  return (
    <Dialog.Root size="xl" scrollBehavior="inside" lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Card.Root
        display="flex"
        flexDirection="column"
        m="20px"
        bg="white"
        borderColor="gray.200"
        overflow="hidden"
        maxW="xl"
        _hover={{ scale: 1.02, cursor: "pointer" }}
        onClick={() => setOpen(true)}
      >
        {image && (
          <Image
            w="100%"
            objectFit="cover"
            maxH="200px"
            src={image}
            alt={title}
          />
        )}

        <Box p="4">
          <Card.Title color="gray.700" mb="2">{title}</Card.Title>
          <Card.Description>{truncatedContent}</Card.Description>
        </Box>
      </Card.Root>

      {/* Contenido del modal */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" color="gray.700">
            {/* Botón de cerrar en la esquina superior derecha */}
            <Dialog.CloseTrigger asChild>
              <CloseButton _hover={{bg:"red",color:"white"}} color="red" position="absolute" top="10px" right="10px" size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            {/* Mostrar la imagen en el modal */}
            {image && (
              <Image w="100%" objectFit="cover" maxH="300px" src={image} alt={title} />
            )}

            <Dialog.Body>
              <Text>{content}</Text>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
