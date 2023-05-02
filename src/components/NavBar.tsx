import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Text, VStack, Icon, HStack } from '@chakra-ui/react'
import Slider from './Slider'
import { BsFacebook, BsGithub, BsLinkedin } from 'react-icons/bs'

export const NavBar = () => {
    return (
        <Tabs position="relative" variant="unstyled">
            <TabList
                position='sticky'
                display='flex'
                h={'14'}
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                zIndex={5}
                bgColor={'gray.300'}
                borderBottom={'2px'}
                borderBottomColor={'gray.400'}
            >
                <Tab>Gallery</Tab>
                <Tab>About</Tab>
            </TabList>
            <TabIndicator
                position='sticky'
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                mt="-1.5px"
                height="4px"
                bg="blackAlpha.700"
                borderRadius="1px"
            />
            <TabPanels>
                <TabPanel>
                    <Slider />
                </TabPanel>
                <TabPanel>
                    <VStack position={"absolute"} spacing={'5'} top={"250%"} left="50%" transform={"translate(-50%)"}>
                        <Text color={'blackAlpha.800'} align={'center'} fontSize='3xl' fontWeight={'bold'} lineHeight={'10'}>
                            Thank you for visiting <br />
                            my gallery
                        </Text>
                        <VStack>
                            <HStack spacing={'3'}>
                                <Icon as={BsGithub} boxSize={'6'} color={'gray.500'} />
                                <Icon as={BsFacebook} boxSize={'6'} color={'gray.500'} />
                                <Icon as={BsLinkedin} boxSize={'6'} color={'gray.500'} />
                            </HStack>
                        </VStack>
                    </VStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
