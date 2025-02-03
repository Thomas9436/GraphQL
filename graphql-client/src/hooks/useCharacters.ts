import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://rickandmortyapi.com/graphql";

export type Character = {
  id: string;
  name: string;
  image: string;
  species?: string;
  status?: string;
  gender?: string;
  origin?: { name: string };
};

export function useCharacters() {
  const { id } = useParams<{ id: string }>(); // recup id depuis l'url
  const [character, setCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let query;
        let variables;

        if (id) {
          // Un seul perso
          query = `
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
          `;
          variables = { id };
        } else {
          // Liste de perso
          query = `
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
          `;
          variables = { page };
        }

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const { data } = await response.json();

        if (id) {
          setCharacter(data?.character ?? null);
        } else {
          if (data?.characters?.results) {
            setCharacters(data.characters.results);
            setHasNextPage(!!data.characters.info?.next);
          } else {
            throw new Error("Données incorrectes reçues de l'API");
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  const nextPage = () => {
    setCharacters([]); // Vide la liste 
    setPage((prev) => prev + 1);
  };

  return { character, characters, hasNextPage, nextPage, loading, error };
}
