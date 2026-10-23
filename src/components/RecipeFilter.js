function RecipeFilter(props) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Rechercher une recette..."
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />

      <select
        value={props.categorie}
        onChange={(e) => props.setCategorie(e.target.value)}
      >
        <option value="Toutes">Toutes les catégories</option>
        <option value="Plat">Plat</option>
        <option value="Dessert">Dessert</option>
        <option value="Entrée">Entrée</option>
        <option value="Boisson">Boisson</option>
      </select>
    </div>
  );
}

export default RecipeFilter;