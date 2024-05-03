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
import {IModalAuth} from "../../interfaces/modal.interface.ts";
import SignupComponent from "./SignupModalComponent.tsx";
import LoginComponent from "./LoginModalComponent.tsx";
import React from "react";

function AuthModal({modal, setModal, setModalPassword}: IModalAuth) {
    const closeModal = (): void => {
        setModal(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    return (
        <Modal
            isOpen={modal}
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
                                <LoginComponent setModalAuth={setModal} setModalPassword={setModalPassword}/>
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
