import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./favoritos.css";

const Favoritos = () => {
  const [filmes, setFilmes] = useState();

  useEffect(() => {
    const minhaLista = localStorage.getItem("@filmes");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  const ExcluirFavorito = (id) => {
    const fitroFilmes = filmes.filter((item) => item.id !== id);

    setFilmes(fitroFilmes);
    localStorage.setItem("@filmes", JSON.stringify(fitroFilmes));
    toast.success("Fime removido com sucesso!");
  };

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes?.length === 0 && <span>Lista de filmes vazia :(</span>}
      <ul>
        {filmes?.map((filme) => (
          <li key={filme.id}>
            <span>{filme.title}</span>
            <div>
              <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
              <button onClick={() => ExcluirFavorito(filme.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favoritos;
