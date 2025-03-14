import { useState } from 'react'
import { HomePage } from './components/HomePage'
import { Box } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box bg="white">
        <HomePage></HomePage>
      </Box>
    </>
  )
}

export default App
