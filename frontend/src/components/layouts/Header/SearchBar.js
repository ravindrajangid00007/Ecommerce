import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import {getAdminProducts} from '../../../state/action-creators/productAction';
const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [products, setProducts] = useState([]);
    // const [open, setOpen] = useState(true);
    const handleFilter = (event) => {
        // setOpen(true);
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const newFilter = products.filter((product) => {
            return product.name.toLowerCase().trim().includes(searchWord.toLowerCase().trim());
        });
        if (searchWord.trim()) {
            setFilteredData(newFilter);
        } else {
            setFilteredData([]);
        }
    }
    const searchHandler = (keyword) => {
        if (keyword.trim()) {
            // setOpen(false);
            setFilteredData([]);
            if(keyword.trim()){
                navigate(`/products/${keyword}`);
            }else{
                navigate(`/products`);
            }
        }
    }
    const handleListItemClick = async (e, name) => {
        setWordEntered(name);
        searchHandler(name);
    }
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('/api/v1/admin/all-products');
            setProducts(data.product);
            console.log("data is ",data);
        }
        getProducts();
    }, [dispatch]);
    return <>
        <div className="search">
            <form className="searchInputs" onSubmit={(e) => { e.preventDefault(); searchHandler(wordEntered); }}>
                <div>
                    <input
                        type="text"
                        placeholder="Search for products,brands and more"
                        value={wordEntered}
                        onChange={handleFilter}
                    />
                </div>
                <button type="submit" className="searchIcon">
                    <SearchIcon />

                </button>
            </form>
            {filteredData.length > 0 &&
                <ul className="display dataResult">
                    {filteredData.slice(0, 15).map((product, key) => (
                        <li key={key} onClick={(e) => { handleListItemClick(e, product.name) }}>{product.name}</li>
                    ))}
                </ul>
            }
        </div>
    </>;
};

export default SearchBar;
