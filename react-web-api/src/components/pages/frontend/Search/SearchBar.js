import React, { useState, useEffect } from 'react'
import SearchIcon from "@material-ui/icons/Search";
import "./SearchBar.css";
import CloseIcon from "@material-ui/icons/Close";
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.productname.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const CategoryApi = 'http://localhost:8080/api/prd/products'
  const [products, setCategory] = useState([])
  useEffect(() => {
    fetch(CategoryApi)
      .then(res => res.json())
      .then(categories => {
        setCategory(categories)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  console.log(products)

  return (

    <div className="col-xl-6 col-lg-5 col-md-6">
      <form action="#" className="search-header">
        <div className="input-group w-100">
          <select className="custom-select border-right" name="category_name">
            <option value>Tất cả</option><option value="codex">Đặt biệt</option>
            <option value="comments">Tốt nhất</option>
            <option value="content">Mới nhất</option>
          </select>

          <input
            className="form-control"
            type="text"
            value={wordEntered}
            placeholder={placeholder}
            onChange={handleFilter}
          />


          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              {filteredData.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </button>
          </div>

        </div>
      </form>
      {filteredData.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <a className="dataItem" href={`/prddetail/${value.id}`} > {/*target="_blank": mo ra trang khac*/}
                    <p>{value.productname} </p>
                  </a>
                );
              })}
            </div>
          )}

    </div>

  );
}
export default SearchBar