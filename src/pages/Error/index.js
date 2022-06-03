import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Pagina nao encontrada</h2>
      <Link to="/">Veja todos os Filmes</Link>
    </div>
  );
};

export default Error;
