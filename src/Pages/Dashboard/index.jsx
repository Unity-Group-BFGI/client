import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../templates/Layouts/Dashboard.layout";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(location.pathname === "/dashboard" || location.pathname === "/dashboard/my-account"){
            navigate("/dashboard/my-account/overview");
        } else if(location.pathname === "/dashboard/ielts-lms"){
            navigate("/dashboard/ielts-lms/my");
        }
    },[location]);
    return (<DashboardLayout><Outlet /></DashboardLayout>);
};

export default Dashboard;