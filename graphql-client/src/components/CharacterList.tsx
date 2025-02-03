import { Link } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";

function CharacterList() {
  const { characters, hasNextPage, nextPage, loading, error } = useCharacters();

  return (
    <div>
      <h1>Rick & Morty Characters</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {characters?.map((char) => (
          <Link key={char?.id} to={`/character/${char?.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={{ border: "1px solid black", padding: "10px", borderRadius: "8px" }}>
              <img src={char?.image ?? ""} alt={char?.name ?? "Unknown"} width={100} height={100} />
              <p>{char?.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {hasNextPage && !loading && (
        <button onClick={nextPage}>Next Page</button>
      )}
    </div>
  );
}

export default CharacterList;
