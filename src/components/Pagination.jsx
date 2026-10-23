function Pagination(props) {
  return (
    <div className="pagination">
      <button
        onClick={() => props.setPage(props.page - 1)}
        disabled={props.page === 1}
      >
        Précédent
      </button>

      <span>Page {props.page} / {props.totalPages}</span>

      <button
        onClick={() => props.setPage(props.page + 1)}
        disabled={props.page === props.totalPages}
      >
        Suivant
      </button>
    </div>
  );
}

export default Pagination;