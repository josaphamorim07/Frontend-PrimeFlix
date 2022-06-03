import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import "./filme.css";

const Filme = () => {
  const [filmeDetails, setFilmeDetails] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navagate = useNavigate();
  useEffect(() => {
    async function loadFilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "7036bbeece2d0a8d84db5da0184e0811",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          setFilmeDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          navagate("/", { replace: true });
        });
    }
    loadFilmes();
  }, [navagate, id]);

  const saveFilme = () => {
    const minhaLista = localStorage.getItem("@filmes");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filmeDetails.id
    );

    if (hasFilme) {
      toast.warn('Esse filme ja esta na lista!')
      return;
    }
    filmesSalvos.push(filmeDetails);
    localStorage.setItem("@filmes", JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!')
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes.....</h2>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filmeDetails.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filmeDetails.backdrop_path}`}
        alt={filmeDetails.title}
      />
      <h3>Sinopse</h3>
      <span>{filmeDetails.overview}</span>

      <strong>Avaliaçao:{filmeDetails.vote_average}/10</strong>
      <div className="are-buttons">
        <button onClick={saveFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="external noreferrer"
            href={`https://youtube.com/results?search_query=${filmeDetails.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};

export default Filme;
