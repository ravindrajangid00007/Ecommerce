import React from "react";
import "./Sidebar.css";
import LogoImage from '../../images/canvaLogo.jpeg';
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
// import RateReviewIcon from "@material-ui/icons/RateReview";
const Sidebar = () => {
  return <>

    <div className="sidebar">
        <Link to="/">
            <img src={LogoImage} alt="E-Commerce" />
        </Link>
        <Link to="/dashboard">
            <p>
                <DashboardIcon />Dashboard
            </p>
        </Link>
        <Link to="#">
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ImportExportIcon />}
            >
                <TreeItem nodeId="1" label="Products">
                    <Link to="/admin/products">
                        <TreeItem nodeId="2" label="ALL" icon={<PostAddIcon />} />
                    </Link>

                    <Link to="/admin/product">
                        <TreeItem nodeId="3" label="create" icon={<AddIcon />} />
                    </Link>

                </TreeItem>
            </TreeView>
        </Link>
        <Link to="/admin/orders">
            <p>
                <ListAltIcon /> Orders
            </p>
        </Link>
        <Link to="/admin/users">
            <p>
                <PeopleIcon /> Users
            </p>
        </Link>
    </div>
  </>;
};

export default Sidebar;
