function RecipeItem(props) {
  const recipe = props.recipe;

  return (
    <div className="recipe-card">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.nom} />
      )}

      <h3>{recipe.nom}</h3>
      <p>{recipe.description}</p>
      <p><b>Catégorie :</b> {recipe.categorie}</p>
      <p><b>Ingrédients :</b> {recipe.ingredients}</p>

      <button onClick={() => props.onEdit(recipe)}>
        Modifier
      </button>

      <button onClick={() => props.onDelete(recipe.id)}>
        Supprimer
      </button>
    </div>
  );
}

export default RecipeItem;