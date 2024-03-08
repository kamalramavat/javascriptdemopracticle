import React, { useState, useEffect, useRef } from 'react';
import './styles.css'; // External CSS file

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const searchBoxRef = useRef(null); // Reference to the search box input element

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if CTRL/CMD + / is pressed
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        // Ensure that the searchBoxRef exists and is not null before trying to access its properties
        if (searchBoxRef.current) {
          searchBoxRef.current.focus();
        }
      }
    };
    

    // Attach the keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();
      setData(countries);
      console.log(countries);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page when search term changes
  };

  const filteredData = data.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearch = () => {
    console.log(data);
  };

  return (
    <div>
        <input
        type="text"
        placeholder="Search Places..."
        value={searchTerm}
        onChange={handleChange}
        className="searchbox"
      />
      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((country, index) => (
            <tr key={country.name.common}>
              <td>{index + 1}</td>
              <td>{country.name.common}</td>
              <td>
                <img src={country.flags && country.flags.png} alt={country.name.common} className="flag"/>
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="3">No Result Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        {pageNumbers.slice((currentPage - 1) * 5, currentPage * 5).map(number => (
          <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
      </div>
    </div>
  );
};

export default SearchBox;
