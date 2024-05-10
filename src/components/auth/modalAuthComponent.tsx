import {
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    TabPanels,
    TabPanel,
    TabList,
    Modal,
    Tabs,
    Tab,
} from '@chakra-ui/react';
import SignupComponent from './SignupModalComponent.tsx';
import LoginComponent from './LoginModalComponent.tsx';
import React from 'react';
import {useModalTypeContext} from "../../context/modal.context.tsx";

/**
 * @name AuthModal
 * @description This component is used to display the authentication modal.
 * @constructor
 */
function AuthModal() {
    const {modalState, setModalState} = useModalTypeContext();

    /**
     * @name closeModal
     * @description This function is used to close the modal.
     */
    const closeModal = () => {
        setModalState({state: null});
    }

    /**
     * @name handleKeyDown
     * @param e
     * @description This function is used to handle the key down event.
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    return (
        <Modal
            isOpen={modalState.state === 'auth'}
            onClose={closeModal}
        >
            <ModalOverlay/>
            <ModalContent className='modalWindow' onKeyDown={handleKeyDown}>
                <Tabs isFitted variant='enclosed'>
                    <ModalHeader>
                        <TabList>
                            <Tab>Log In</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                    </ModalHeader>
                    <ModalBody>
                        <TabPanels>
                            <TabPanel>
                                <LoginComponent/>
                            </TabPanel>
                            <TabPanel>
                                <SignupComponent/>
                            </TabPanel>
                        </TabPanels>
                    </ModalBody>
                </Tabs>
            </ModalContent>
        </Modal>
    );
}

export default AuthModal;
