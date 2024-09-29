import { Box, Button, Grid, Heading, Image, Text, VStack, Skeleton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { useRouter } from 'next/router';

const CHARACTERS_QUERY = gql`
query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        location {
          id
        }
        image
        episode {
          id
        }
        created
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location: {
    id: string;
  };
  image: string;
  episode: string[];
  created: string;
}

export const Main = () => {
  const router = useRouter();
  const page = parseInt(router.query.page as string, 10) || 1;
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const { data, loading, error } = useQuery<{ characters: { results: Character[]; info: { count: number; pages: number } } }>(CHARACTERS_QUERY, {
    variables: { page: page },
  });

  const handlePrevPage = () => {
    router.push(`/?page=${page - 1}`);
  };

  const handleNextPage = () => {
    router.push(`/?page=${page + 1}`);
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <Box
      minHeight="calc(100vh - 72px)"
      width={'100%'}
      gap={4}
    >
      <Box bg="gray.100" overflowY="auto" px={4} pt={"72px"} pb={"73px"} width="100%">
        <Grid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={6}
          py={4}
          justifyContent="center"
          width="100%"
        >
          {loading ? (
            // Skeleton loaders while data is loading
            Array.from({ length: 20 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : error ? (
            <Text color="red.500" textAlign="center">Error: {error.message}</Text>
          ) : (
            data?.characters.results.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => handleCharacterClick(character)}
              />
            ))
          )}
        </Grid>
      </Box>
      <Grid
        templateColumns="1fr auto 1fr"
        alignItems="center"
        p={4}
        borderTopWidth={1}
        bg="white"
        position="fixed"
        bottom={0}
        width="100%"
      >
        <Button
          justifySelf="start"
          onClick={handlePrevPage}
          isDisabled={page === 1}
        >
          Prev
        </Button>
        <Text>{data ? 'Page ' + page + ' of ' + data.characters.info.pages : ''}</Text>
        <Button
          justifySelf="end"
          onClick={handleNextPage}
          isDisabled={page === data?.characters.info.pages}
        >
          Next
        </Button>
      </Grid>
      <CharacterModal
        isOpen={selectedCharacter !== null}
        onClose={handleCloseModal}
        character={selectedCharacter}
      />
    </Box>
  );
};

const SkeletonCard = () => (
  <VStack p={4} borderWidth={1} borderRadius="md" align="start">
    <Skeleton height="200px" width="100%" borderRadius="md" />
    <Skeleton height="24px" width="80%" />
    <Skeleton height="20px" width="60%" />
    <Skeleton height="20px" width="70%" />
  </VStack>
);

const CharacterCard = ({ character, onClick }: { character: Character; onClick: () => void }) => (
  <VStack
    p={4}
    bg="gray.50"
    borderWidth={1}
    borderRadius="md"
    align="start"
    cursor="pointer"
    onClick={onClick}
  >
    <Image
      src={character.image}
      alt={character.name}
      borderRadius="md"
      objectFit="cover"
      w="100%"
      h="200px"
    />
    <Heading as="h2" size="md">{character.name}</Heading>
    <Text>Status: {character.status}</Text>
    <Text>Species: {character.species}</Text>
  </VStack>
);

const CharacterModal = ({ isOpen, onClose, character }: { isOpen: boolean; onClose: () => void; character: Character | null }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="lg">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{character?.name}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Image
          src={character?.image}
          alt={character?.name}
          borderRadius="md"
          objectFit="cover"
          w="100%"
          h="300px"
          mb={4}
        />
        <Table size='sm' variant="simple">
          <Tbody>
            <Tr>
              <Td fontWeight="bold">ID</Td>
              <Td>{character?.id || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Status</Td>
              <Td>{character?.status || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Species</Td>
              <Td>{character?.species || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Type</Td>
              <Td>{character?.type || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Gender</Td>
              <Td>{character?.gender || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Last Known Location</Td>
              <Td>{character?.location.id || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Number of Episodes</Td>
              <Td>{character?.episode.length || '-'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Created</Td>
              <Td>{character?.created ? new Date(character.created).toLocaleDateString() : '-'}</Td>
            </Tr>
          </Tbody>
        </Table>
      </ModalBody>
    </ModalContent>
  </Modal>
);
