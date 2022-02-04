import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminProducts,
    deleteProduct
} from "../../state/action-creators/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import {DELETE_PRODUCT_RESET} from '../../state/constants/productConstants';
const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { error, products } = useSelector((state) => state.productReducer);

      const { error: deleteError, isDeleted } = useSelector(
        (state) => state.deleteProductReducer
      );

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }

        if (isDeleted) {
          alert.success("Product Deleted Successfully");
          navigate("/admin/products");
          dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());
    }, [dispatch, alert, error, navigate ,deleteError ,isDeleted]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200},

        {
            field: "name",
            headerName: "Name",
            minWidth: 250
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 250
           
        },

        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboardPage">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;
