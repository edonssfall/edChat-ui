import { useTokens } from '../../services/token.service.ts';
import { useProfile } from '../../services/user.service.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { Center, Heading } from '@chakra-ui/react';
import ChatComponent from './ChatComponent.tsx';


/**
 * @name MainChatComponent
 * @description component: MainChatComponent
 */
function MainChatComponent() {
  const { profile } = useProfile(),
    { refreshToken } = useTokens(),
    chat = useAppSelector(state => state.chat);

  return (
    <>
      <Center h={'100vh'}>
        {refreshToken && profile.username ? (
          !chat.selectedChat ? (
            <Heading size={{ lg: '3xl', md: 'xl' }} color={'blue.500'}>
                            Welcome, {profile.username}!
            </Heading>
          ) : (
            <>
              <ChatComponent/>
            </>
          )) : (
          <></>
        )}
      </Center>
    </>
  );
}

export default MainChatComponent;
