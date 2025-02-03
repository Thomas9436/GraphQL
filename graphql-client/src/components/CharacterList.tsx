import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Character } from "../generated/graphql";

const API_URL = "https://rickandmortyapi.com/graphql";

function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetCharacters($page: Int!) {
              characters(page: $page) {
                info {
                  next
                }
                results {
                  id
                  name
                  image
                }
              }
            }
          `,
          variables: { page },
        }),
      });

      const { data } = await response.json();
      setCharacters(data.characters.results);
      setHasNextPage(!!data.characters.info.next);
    };

    fetchCharacters();
  }, [page]);

  return (
    <div>
      <h1>Rick & Morty Characters</h1>
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
      {hasNextPage && <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>}
    </div>
  );
}

export default CharacterList;
