import { useState, useEffect } from "react";
import { Main } from "../components/Main";
import ClientOnly from "../components/ClientOnly";
import UserDataModal from "../components/UserDataModal";
import { Navbar } from "../components/Navbar";
import { Flex } from "@chakra-ui/react";

const Index = () => {
  const [userData, setUserData] = useState<{ name: string; jobTitle: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlockingModal, setIsBlockingModal] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      setIsModalOpen(true);
      setIsBlockingModal(true);
    }
  }, []);

  const handleSubmit = (name: string, jobTitle: string) => {
    const newUserData = { name, jobTitle };
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setUserData(newUserData);
    setIsModalOpen(false);
    setIsBlockingModal(false);
  };

  return (
    <ClientOnly>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        height="100vh"
        color="black"
        transition="all 0.15s ease-out"
      >
        <Navbar
          userInfo={userData}
          onEditProfile={openModal} pageName="Information Page" />
        <Main />
        <UserDataModal
          isOpen={isModalOpen}
          onClose={isBlockingModal ? undefined : closeModal}
          onSubmit={handleSubmit}
          initialData={userData}
          isBlocking={isBlockingModal}
        />
      </Flex>
    </ClientOnly>
  );
};

export default Index;
