import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.js';
import Typography from '@mui/material/Typography';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, clearErrors } from '../../state/action-creators/productAction';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../state/constants/productConstants';
import { useAlert } from "react-alert";
import "./NewProduct.css";
const NewProduct = () => {


    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { loading, error, success } = useSelector((state) => state.newProductReducer);
    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("description", description);
        myForm.set("price", price);
        myForm.set("category", category);
        myForm.set("stock", stock);
        console.log(myForm);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(createProduct(myForm));
    };
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Product create successfully");
            navigate("/admin/products");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [error, success, alert, navigate, dispatch]);

    return <>
        <div className="dashboardPage">
            <Sidebar />
            <div className="newProductContainer">
                <Typography component="h1">Create Product</Typography>

                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                >
                    <div>
                        <SpellcheckIcon />
                        <input
                            type="text"
                            placeholder="Product Name"
                            required
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <div>
                        <AttachMoneyIcon />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            required
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                    </div>
                    <div>
                        <DescriptionIcon />
                        <textarea
                            cols="30"
                            rows="2"
                            placeholder="Product Description"
                            value={description}
                            required
                            onChange={(e) => { setDescription(e.target.value) }}
                        ></textarea>
                    </div>
                    <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose a Category:</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <StorageIcon />
                        <input
                            type="number"
                            placeholder="Stock"
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            required
                            onChange={createProductImagesChange}
                            multiple
                        />
                    </div>
                    <div id="createProductFormImage">
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>
                    <Button
                        id="createProductBtn"
                        type="submit"
                        onClick={createProductSubmitHandler}
                        disabled={loading ? true : false}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    </>;
};

export default NewProduct;
