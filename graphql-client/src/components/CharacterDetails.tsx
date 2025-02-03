import { useCharacters } from "../hooks/useCharacters";

function CharacterDetails() {
  const { character, loading, error } = useCharacters();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!character) return <p>Character not found</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={200} />
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin?.name}</p>
    </div>
  );
}

export default CharacterDetails;
