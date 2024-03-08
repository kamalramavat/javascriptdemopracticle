import React, { useState } from 'react';
import SearchBox from './SearchBox';
import './css/Table.css'; // Importing external CSS file for table styles

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (term) => {
    // Perform search logic here
    console.log('Searching for:', term);
    // Example: setSearchResults([...results...]);
  };

  // Example pagination logic
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableHeader = () => {
    return (
      <tr>
        <th>#</th>
        <th>First</th>
        <th>Last</th>
        <th>Handle</th>
      </tr>
    );
  };

  const renderTableData = () => {
    return currentItems.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.handle}</td>
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <h1>Search Example</h1>
      <SearchBox onSearch={handleSearch} />
      <table className="custom-table">
        <thead>
          {renderTableHeader()}
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default App;
