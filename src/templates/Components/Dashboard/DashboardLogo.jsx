import { Link } from "react-router-dom";
const DashboardLogo = () => {
    return (<div className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-10">
        <Link to={"/dashboard/my-account/overview"}>
            <img src={"/assets/svg/site-logo.svg"} alt="Site logo" className="h-50px" />
        </Link>
    </div>);
};

export default DashboardLogo;