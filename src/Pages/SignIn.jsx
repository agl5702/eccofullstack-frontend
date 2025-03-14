import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/services/useLogin"; // Importa tu hook
import { Button, Fieldset, Input, Stack, Box, Center, Circle } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { CiLogin } from "react-icons/ci";
import pythonImage from "../assets/f5.avif";

export const Signin = () => {
  const navigate = useNavigate();
  const { login, token, loading, error } = useLogin(); // Usa el hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const data = await login(username, password);
    if (data) {
      navigate("/")
      // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
    }
  };

  return (
    <Center minH="100vh" p={4} bgImage={`url(${pythonImage})`} bgSize="cover">
      <Box w="100%" maxW="500px">
        <Box
          m="auto"
          w="90%"
          maxW="500px"
          justifyContent="center"
          borderRadius="20px"
          display="flex"
          textAlign="center"
          background="linear-gradient(45deg, black, #1a1a1a, rgb(36, 105, 17), #004d00)"
          backgroundSize="300% 300%"
          animation="gradientAnimation 12s ease-in-out infinite"
        >
          <Fieldset.Root size="lg" w="100%">
            <Stack w="100%">
              <Box
                display="flex"
                w="100%"
                borderTopRadius="20px"
                background="linear-gradient(to bottom right, black, rgb(125, 123, 123), rgb(153, 150, 150), rgb(145, 145, 145))"
                p={2}
              >
                <Circle size="5" mx={2} bg="red.600" />
                <Circle size="5" mx={2} bg="yellow.400" />
                <Circle size="5" mx={2} bg="green.400" />
              </Box>

              <Fieldset.Legend fontSize={{ base: "18px", md: "22px" }}>
                Login
              </Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your credentials.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content textAlign="center">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                id="username"
                w="80%"
                maxW="400px"
                m="auto"
                my={2}
                placeholder="Username"
                border="2px solid transparent"
                borderColor="green.400"
                bgGradient="linear(to-r, green.400, yellow.300, green.600)"
                _focus={{
                  borderColor: "green.500",
                  boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)",
                }}
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                w="80%"
                maxW="400px"
                m="auto"
                my={2}
                placeholder="Password"
                type="password"
                border="2px solid transparent"
                borderColor="blue.400"
                bgGradient="linear(to-r, blue.400, blue.700, blue.600)"
                _focus={{
                  borderColor: "blue.200",
                  boxShadow: "0 0 10px rgba(17, 59, 90, 0.8)",
                }}
              />
            </Fieldset.Content>

            {error && (
              <Box color="red.400" textAlign="center" mt={2}>
                {error}
              </Box>
            )}

            <Button
              w="50%"
              maxW="400px"
              m="auto"
              my={4}
              bg="white"
              _hover={{
                background:
                  "linear-gradient(45deg, black,rgb(162, 162, 162), rgb(173, 201, 164),rgb(68, 66, 66))",
                backgroundSize: "200% 290%",
                animation: "gradientAnimation 6s ease-in-out infinite",
                color: "white",
              }}
              onClick={handleLogin}
              isLoading={loading} // Muestra el estado de carga
            >
              Login
              <CiLogin color="green" />
            </Button>
          </Fieldset.Root>
        </Box>
      </Box>

      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Center>
  );
};
