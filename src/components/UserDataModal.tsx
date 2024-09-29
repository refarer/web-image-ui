import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface UserDataModalProps {
  isOpen: boolean;
  onClose: (() => void) | undefined;
  onSubmit: (name: string, jobTitle: string) => void;
  initialData: { name: string; jobTitle: string } | null;
  isBlocking: boolean;
}

const UserDataModal: React.FC<UserDataModalProps> = ({ isOpen, onClose, onSubmit, initialData, isBlocking }) => {
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setJobTitle(initialData.jobTitle);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit(name, jobTitle);
    onClose && onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose ?? (() => {})} isCentered closeOnOverlayClick={!isBlocking}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Profile' : 'Welcome!'}</ModalHeader>
        {!isBlocking && <ModalCloseButton />}
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Job Title</FormLabel>
            <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDataModal;