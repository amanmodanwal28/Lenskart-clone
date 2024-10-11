import { Collapse, Box, VStack, HStack, Text, Checkbox } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';


export const CollapseEx = ({ title }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <VStack width='100%' spacing='0' borderTopRadius='10%'>
        <Box borderBottom='2px rgb(243,243,243) solid ' width={'100%'} padding='15px'><HStack width='100%' justifyContent='space-between' onClick={onToggle} _hover={{cursor:'pointer'}}><Text>{title}</Text> <ChevronDownIcon /></HStack>
        </Box>
        <Collapse in={isOpen} animateOpacity>
          <Box padding={'4px'} color={'grey'} w={208} h={200} overflowY='scroll'>
            <VStack align={'left'}>
              <Checkbox><Text color='#9D9D9D'>Black</Text></Checkbox>
              <Checkbox><Text color='#9D9D9D'>Blue</Text></Checkbox>
              <Checkbox><Text color='#9D9D9D'>Grey</Text></Checkbox>
              <Checkbox><Text color='#9D9D9D'>Brown</Text></Checkbox>
              <Checkbox><Text color='#9D9D9D'>Gunmetal</Text></Checkbox>
            </VStack>
          </Box>
        </Collapse>
      </VStack>
    </>
  )
}