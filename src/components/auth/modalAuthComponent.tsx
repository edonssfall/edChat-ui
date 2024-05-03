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
} from "@chakra-ui/react";
import {IModal} from "../../interfaces/modal.interface.ts";
import SignupComponent from "./SignupModalComponent.tsx";
import LoginComponent from "./LoginModalComponent.tsx";
import React from "react";

function AuthModal({modalType, setModalType}: IModal) {
    const closeModal = (): void => {
        setModalType(null);
    }

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    return (
        <Modal
            isOpen={modalType === 'auth'}
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
                                <LoginComponent setModalType={setModalType}/>
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
