import { ReactNode } from 'react'
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  HStack,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import { MinusIcon, AddIcon } from '@chakra-ui/icons'
// import Appstore from '../Assets/Appstore.svg'
// import GooglePlay from '../Assets/Googleplaystore.svg'

// import AppStoreBadge from '@/components/AppStoreBadge';
// import PlayStoreBadge from '@/components/PlayStoreBadge';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'xl'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function LargeWithAppLinksAndSocial() {
  return (
    <Box bg={'#020C42'} color="white">
      <Box>
        <Container as={Stack} maxW={'7xl'}>
          <div style={{ marginTop: '30px' }}>
            <Heading align="left">Buy The Best Eyewear From Lenskart</Heading>
            <br />
            <Text align="left" fontSize="sm">
              Lenskart Is The Leading E-Commerce Portal For Eyewear In India. It
              Has Revolutionised The Eyewear Industry In The Country With Its
              Omni-Channel Approach. From An Ever-Growing Number Of Offline
              Stores Across Major Cities In The Country To Innovative
              Integration Of Technology While Purchasing Online, Lenskart Caters
              To Every Customer With Several Deals And Offers.
            </Text>
            <br />
            <Text align="left" fontSize="sm">
              A One-Stop Online Solution For Purchasing Eyewear And Its
              Accessories, Lenskart Delivers Them Right At Your Doorstep With
              Convenient Methods Of Payment. Sunglasses As Well As Eyeglasses
              Are Available For Men And Women In A Diverse Array Of Styles And
              Trendy Colours. If You Want To Try Out Contact Lenses, Pick The
              Ones Of Your Choice From The Extensive Variety Of Coloured Contact
              Lenses From Our Online Store.
            </Text>
            <br />
            <div
              style={{
                display: 'flex',
                width: '100%',
                margin: 'auto',
                justifyContent: 'space-between',
                marginTop: '30px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '30%',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid white',
                }}
              >
                <Text>SUNGLASSES</Text>
                <AddIcon />
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '30%',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid white',
                }}
              >
                <Text>EYEGLASSES</Text>
                <AddIcon />
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '30%',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid white',
                }}
              >
                <Text>CONTACT LENSES</Text>
                <AddIcon />
              </div>
            </div>
          </div>
        </Container>
      </Box>

      <Container as={Stack} maxW={'7xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Service</ListHeader>
            <Link href={'#'}>Store Locator</Link>
            <Link href={'#'}>Enter My Power</Link>
            <Link href={'#'}>Buying Guide</Link>
            <Link href={'#'}>Frame Size</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>About Us</ListHeader>
            <Link href={'#'}>We Are Hiring</Link>
            <Link href={'#'}>Refer & Earn</Link>
            <Link href={'#'}>Lenskart Coupons</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Help</ListHeader>
            <Link href={'#'}>FAQ's</Link>
          </Stack>
          <Stack alignItems={'center'} justifyContent={'center'}>
            <HStack align={'flex-start'} justifyContent={'space-evenly'}>
              <Image
                src="https://static.lenskart.com/media/desktop/img/play-store.svg"
                _hover={{ cursor: 'pointer' }}
              />
              <Image
                src="https://static.lenskart.com/media/desktop/img/app-store.svg"
                _hover={{ cursor: 'pointer' }}
              />
            </HStack>
            <div>
              <Text fontSize={'sm'}>Download Lenskart App to buy</Text>
              <Text fontSize={'sm'}>
                Eyeglasses, Sunglasses and Contact Lenses
              </Text>
            </div>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={2}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'7xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Box w={280}>
            <Flex justifyContent={'space-between'}>
              <Text>T&C</Text>
              <Text>Privacy</Text>
              <Text>Disclaimer</Text>
            </Flex>
          </Box>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
