'use client';
import Icon from '@/components/Icon';
import { ChatMessages, Community } from '@/types/state';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import BoringAvatars from 'boring-avatars';
import { KeyboardEvent, useState } from 'react';
import { MdChat, MdEvent, MdViewAgenda } from 'react-icons/md';
import { formatChatTimestamp, maskHexAddress } from '@/helpers';

import { useAppContext } from '@/context/state';
import { nanoid } from 'nanoid';



export default function CommunityViewPage() {
  const [messageToSend, setMessageToSend] = useState('');
  
  const {community,setCommunity,user}=useAppContext()

  const [chats, setChats] = useState<ChatMessages[]>(community?.messages as ChatMessages[]);

  function handleInputKeyUp(evt: KeyboardEvent) {
    if (evt.key == 'Enter' && messageToSend !== '') {
      sendMessage();
    }
  }
  function sendMessage() {
const prevChats=chats||[];
const newChats=[...prevChats, {
  timestamp: new Date().getTime(),
  content: messageToSend,
  userAddress: maskHexAddress(user?.userAddress  as string),
  id: nanoid(),
  fullname: user?.name,
}]
    setChats(() => [...newChats]);
    setMessageToSend('');
  }
  return (
    <Box className='h-screen' minH={'620px'} bg={'secondaryColor.50'}>
      <Box bg={'white'} maxW={1250} mx={'auto'}>
        <Box h={'120px'} bg={'primaryColor.800'}></Box>
        <Flex gap={4}>
          <Box
            rounded={'full'}
            w={'80px'}
            h={'80px'}
            border={'2px'}
            borderColor={'white'}
            mt={'-6'}
            ml={6}
          >
            <Box
              as={community?.cover ? Avatar : BoringAvatars}
              variant='sunset'
              w={'full'}
              h={'full'}
              size={'auto'}
              {...{ src: community?.cover, alt: '' }}
            ></Box>
          </Box>
          <Flex>
            <Heading size={'md'} pt={1} fontSize={{ lg: '24px' }}>
              {community?.name}
            </Heading>
          </Flex>
        </Flex>
        <HStack alignItems={'start'} gap={6} my={6} px={6} divider={<StackDivider/>}>
          <Tabs flex={1} variant={'soft-rounded'} colorScheme='primaryColor'>
            <TabList>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdChat />
                  <span>Chats</span>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdEvent />
                  <span>Events</span>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdViewAgenda />
                  <span>Challenges</span>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels h={'full'} py={3}>
              <TabPanel pl={0}  minH={'400px'} pos={'relative'}>
                <Box minH={300} maxH={'350px'} overflowY={'auto'}>

                  {!chats?.length &&
                  
                  <Flex justify={'center'} minH='300' bg={'gray.100'} align={'center'}>
<Text color={'gray.500'} fontWeight={'medium'} fontSize={'xl'}>No Chats yet</Text>
                  </Flex>
                  }
              {chats?.length && 
                  <Stack
                  divider={<StackDivider />}
                  py={4}
                  px={2}
                  rounded={'md'}
                  // bg={'gray.100'}
                  >
                    {chats?.map((message, i) => (
                      <HStack
                        key={message?.id}
                        align={'flex-start'}
                        gap={3}
                        bg={'white'}
                        p={3}
                        rounded={'md'}
                      >
                        <Box as={BoringAvatars} variant='beam'></Box>

                        <Stack>
                          <HStack>
                            <Heading size={'sm'} color={'primaryColor.800'}>
                              {message?.userAddress || '0x456****8bc45'}{' '}
                            </Heading>
                            <Text
                              as={'span'}
                              color={'gray'}
                              fontSize={'sm'}
                              fontWeight={'medium'}
                              >
                              {formatChatTimestamp(message?.timestamp)}
                            </Text>
                          </HStack>

                          <Text>{message?.content}</Text>
                        </Stack>
                      </HStack>
                    ))}
                  </Stack>
                  }
                </Box>
                <HStack
                  pos={'sticky'}
                  bg={'white'}
                  py={3}
                  bottom={0}
                  w={'full'}
                  left={0}
                >
                  <Input
                    value={messageToSend}
                    onChange={(e) => setMessageToSend(e.target.value)}
                    colorScheme='primaryColor'
                    placeholder='Type a message...'
                    onKeyUp={handleInputKeyUp}
                  />
                  <Button
                    variant={'solid'}
                    onClick={() => sendMessage()}
                    // colorScheme='primaryColor'
                    // colorScheme='blue'
                    isDisabled={messageToSend === ''}
                  >
                    Send
                  </Button>
                </HStack>
              </TabPanel>
              <TabPanel>
                <Flex
                  minH={'300px'}
                  align={'center'}
                  justify={'center'}
                  bg={'gray.100'}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                  color={'gray.500'}
                >
                  No Events Available
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex
                  minH={'300px'}
                  align={'center'}
                  justify={'center'}
                  bg={'gray.100'}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                  color={'gray.500'}
                >
                  No Challenges Available
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Stack bg={'white'} maxW={'350px'} pb={6}>
            <Box
              borderBottom={'1px'}
              borderBottomColor={'gray.300'}
              py={3}
              px={5}
            >
              <Heading size={'md'} as={'h3'}>
                About {community?.name}
              </Heading>
              <Text fontSize={'sm'} mt={2}>
                {community?.description}
              </Text>
            </Box>
          </Stack>
        </HStack>
      </Box>
    </Box>
  );
}
