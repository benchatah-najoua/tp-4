import { useState } from "react";

import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeFilter from "./components/RecipeFilter";
import Pagination from "./components/Pagination";
import Aide from "./components/Aide";

function MainPage() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      nom: "Pizza",
      description: "Pizza au fromage",
      categorie: "Plat",
      ingredients: "Farine, fromage, tomate",
      image: ""
    },
    {
      id: 2,
      nom: "Gâteau",
      description: "Gâteau au chocolat",
      categorie: "Dessert",
      ingredients: "Farine, chocolat, sucre",
      image: ""
    },
    {
      id: 3,
      nom: "Salade",
      description: "Salade fraîche",
      categorie: "Entrée",
      ingredients: "Tomate, laitue, concombre",
      image: ""
    },
    {
      id: 4,
      nom: "Jus",
      description: "Jus d'orange",
      categorie: "Boisson",
      ingredients: "Oranges, eau",
      image: ""
    }
  ]);

  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);

  // Recherche et filtrage
  const filteredRecipes = recipes.filter((recipe) => {
    const nameMatches = recipe.nom
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatches =
      categorie === "Toutes" || recipe.categorie === categorie;

    return nameMatches && categoryMatches;
  });

  // Pagination : 3 recettes par page
  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecipes.length / 3)
  );

  const start = (page - 1) * 3;
  const displayedRecipes = filteredRecipes.slice(start, start + 3);

  // Supprimer une recette
  function deleteRecipe(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));

    if (editing && editing.id === id) {
      setEditing(null);
      setShowForm(false);
    }
  }

  // Ajouter ou modifier une recette
  function saveRecipe(recipe) {
    if (editing) {
      setRecipes(
        recipes.map((r) => (r.id === recipe.id ? recipe : r))
      );
    } else {
      setRecipes([...recipes, recipe]);
    }

    setEditing(null);
    setShowForm(false);
    setPage(1);
  }

  // Ouvrir le formulaire de modification
  function editRecipe(recipe) {
    setEditing(recipe);
    setShowForm(true);
  }

  // Ouvrir le formulaire d'ajout
  function addRecipe() {
    setEditing(null);
    setShowForm(true);
  }

  return (
    <div className="container">
      <h1>Creative Recipe Builder</h1>

      <button onClick={addRecipe}>
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
        recipes={displayedRecipes}
        onDelete={deleteRecipe}
        onEdit={editRecipe}
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

export default MainPage;