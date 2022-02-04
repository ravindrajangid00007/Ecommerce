import React , {useEffect} from 'react';
import Sidebar from './Sidebar.js';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import {useSelector , useDispatch} from "react-redux";
import {
    getAdminProducts,
} from "../../state/action-creators/productAction";
import {getAllOrders} from "../../state/action-creators/orderAction";
import {allUsers} from "../../state/action-creators/userAction";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

import { Chart } from 'react-chartjs-2'
const Dashboard = () => {
    const dispatch = useDispatch();
    let outOfStock = 0;
    const {products} = useSelector((state)=>state.productReducer);
    const {totalAmount , orders} = useSelector((state)=>state.allOrdersReducer)
    const {users} = useSelector((state)=>state.allUsersReducer);
    products && products.forEach((product) => {
        if(product.stock === 0){
            outOfStock = outOfStock + 1;
        }
    });
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
        )
    const lineState = {
        labels: ["Initial Amount", "Total Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rbg(197,72,49)"],
                data: [0, 4000],
            }
        ]
    };
    const doughnutState = {
        labels: ["Out of Stock" , "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4" , "#6800B4"],
                hoverBackgroundColor: ["#4B5000" , "#35014F"],
                data: [outOfStock,products.length - outOfStock],

            }
        ]
    }

    useEffect(() => {
      dispatch(getAdminProducts());
      dispatch(getAllOrders());
      dispatch(allUsers());
    }, [dispatch]);
    

    return <>
        <div className="dashboardPage">
            <Sidebar />
            <div className="dashboardContainer">
                <Typography
                    component="h1"
                >Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>

                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders.length}</p>
                        </Link>

                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    </>;
};

export default Dashboard;
