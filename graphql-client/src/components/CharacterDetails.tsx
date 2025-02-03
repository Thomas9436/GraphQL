import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://rickandmortyapi.com/graphql";

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: { name: string };
};

function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetCharacterDetails($id: ID!) {
              character(id: $id) {
                id
                name
                image
                species
                status
                gender
                origin {
                  name
                }
              }
            }
          `,
          variables: { id },
        }),
      });

      const { data } = await response.json();
      setCharacter(data.character);
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={200} />
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin.name}</p>
    </div>
  );
}

export default CharacterDetails;
