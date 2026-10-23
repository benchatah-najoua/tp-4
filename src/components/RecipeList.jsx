import RecipeItem from "./RecipeItem";

function RecipeList(props) {
  return (
    <div className="recipe-list">
      {props.recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      ))}

      {props.recipes.length === 0 && (
        <p>Aucune recette trouvée.</p>
      )}
    </div>
  );
}

export default RecipeList;