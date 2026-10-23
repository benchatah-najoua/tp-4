
import { useState } from "react";

function RecipeForm(props) {
  const [nom, setNom] = useState(
    props.recipe ? props.recipe.nom : ""
  );

  const [description, setDescription] = useState(
    props.recipe ? props.recipe.description : ""
  );

  const [categorie, setCategorie] = useState(
    props.recipe ? props.recipe.categorie : "Plat"
  );

  const [ingredients, setIngredients] = useState(
    props.recipe ? props.recipe.ingredients : ""
  );

  const [image, setImage] = useState(
    props.recipe ? props.recipe.image : ""
  );

  function handleImage(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const recette = {
      id: props.recipe ? props.recipe.id : Date.now(),
      nom: nom,
      description: description,
      categorie: categorie,
      ingredients: ingredients,
      image: image
    };

    props.onSave(recette);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{props.recipe ? "Modifier" : "Ajouter"} une recette</h2>

      <label>Nom :</label>
      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />

      <label>Description :</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Catégorie :</label>
      <select
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
      >
        <option value="Plat">Plat</option>
        <option value="Dessert">Dessert</option>
        <option value="Entrée">Entrée</option>
        <option value="Boisson">Boisson</option>
      </select>

      <label>Ingrédients :</label>
      <input
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />

      <label>Choisir une image :</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {image && (
        <img
          src={image}
          alt="Aperçu"
          className="preview"
        />
      )}

      <button type="submit">Enregistrer</button>

      <button type="button" onClick={props.onCancel}>
        Annuler
      </button>
    </form>
  );
}

export default RecipeForm;
