import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: "698650a9fc55ca847ff8b83793d93a70", // Reemplaza con tu propia API key de themoviedb.org
          language: "es-ES",
          page: 1,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    let filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedYear) {
      filtered = filtered.filter((movie) => {
        const releaseYear = new Date(movie.release_date)
          .getFullYear()
          .toString();
        return releaseYear === selectedYear;
      });
    }

    setFilteredMovies(filtered);
  }, [searchTerm, selectedYear, movies]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleYearFilter = (year) => {
    setSelectedYear(year);
  };

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            Popular Movies
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Año
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleYearFilter("2024")}
                  >
                    2024
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleYearFilter("2023")}
                  >
                    2023
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleYearFilter("2022")}
                  >
                    2022
                  </a>
                  {/* Agrega más años según sea necesario */}
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <div className="input-group">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Buscar películas..."
                  aria-label="Buscar"
                  onChange={handleSearch}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1>Películas</h1>
        <div className="row mt-4">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                className="card shadow"
                onClick={() => handleOpenModal(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Componente Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie && selectedMovie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <div>
              <p>
                <strong>Resumen:</strong> {selectedMovie.overview}
              </p>
              <p>
                <strong>Fecha de lanzamiento:</strong>{" "}
                {selectedMovie.release_date}
              </p>
              {/* Agrega más detalles según sea necesario */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
