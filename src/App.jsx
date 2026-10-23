
import { useState } from "react";

import RecipeList from "./components/RecipeList.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import RecipeFilter from "./components/RecipeFilter.jsx";
import Pagination from "./components/Pagination.jsx";
import Aide from "./components/Aide.jsx";

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      nom: "Pizza",
      description: "Pizza au fromage",
      categorie: "Plat",
      ingredients: "Farine, fromage, tomate",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
    },
    {
      id: 2,
      nom: "Gâteau",
      description: "Gâteau au chocolat",
      categorie: "Dessert",
      ingredients: "Farine, chocolat, sucre",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
    },
    {
      id: 3,
      nom: "Salade",
      description: "Salade fraîche",
      categorie: "Entrée",
      ingredients: "Tomate, laitue, concombre",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
    },
    {
      id: 4,
      nom: "Jus",
      description: "Jus d'orange",
      categorie: "Boisson",
      ingredients: "Oranges, eau",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
    }
  ]);

  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);

  let recettes = recipes.filter((r) =>
    r.nom.toLowerCase().includes(search.toLowerCase())
  );

  if (categorie !== "Toutes") {
    recettes = recettes.filter((r) => r.categorie === categorie);
  }

  let totalPages = Math.ceil(recettes.length / 3);

  if (totalPages === 0) {
    totalPages = 1;
  }

  let recettesPage = recettes.slice((page - 1) * 3, page * 3);

  function saveRecipe(recipe) {
    if (editing === null) setRecipes([...recipes, recipe]);
    else {
      let newRecipes = recipes.map((r) => {
        if (r.id === recipe.id) return recipe;
        return r;
      });

      setRecipes(newRecipes);
    }

    setEditing(null);
    setShowForm(false);
    setPage(1);
  }

  function deleteRecipe(id) {
    setRecipes(recipes.filter((r) => r.id !== id));
  }

  return (
    <div className="container">
      <h1>Creative Recipe Builder</h1>

      <button onClick={() => {
        setEditing(null);
        setShowForm(true);
      }}>
        Ajouter une recette
      </button>

      {showForm && (
        <RecipeForm
          recipe={editing}
          onSave={saveRecipe}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      <RecipeFilter
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        categorie={categorie}
        setCategorie={(value) => {
          setCategorie(value);
          setPage(1);
        }}
      />

      <RecipeList
        recipes={recettesPage}
        onDelete={deleteRecipe}
        onEdit={(recipe) => {
          setEditing(recipe);
          setShowForm(true);
        }}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <Aide />
    </div>
  );
}

export default App;
