import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  //useStates
  const [repositories, setRepositories] = useState([]);

  //useEffects
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, [repositories]);

  //funções
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
