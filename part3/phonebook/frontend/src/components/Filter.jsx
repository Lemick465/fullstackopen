const Filter = ({ onSearchChange, search, searchResult}) => {
  return (
    <div>
      <div>
        filter shown with <input onChange={onSearchChange} value={search} />
      </div>
      <div>
        {search.trim() !== "" &&
          searchResult.map((result) => (
            <div key={result.id}>
              {result.name} {result.number}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
