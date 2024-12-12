import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SearchQueryContext = createContext();

function SearchQueryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

SearchQueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchQueryProvider;
