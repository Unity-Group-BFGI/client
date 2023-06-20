import { DashboardHeaderLg, DashboardHeaderSm } from "../Components/Headers";
import DashboardMyAccountProfileOverview from "./MyAccountProfileOverview.layout";


const DashboardMyAccountLayout = ({children}) => {
    
    return (<>
        <DashboardHeaderLg />
        <div className="content d-flex flex-column flex-column-fluid">
            <div className="container-xxl ">
                <DashboardHeaderSm />
                <DashboardMyAccountProfileOverview />
                {children}
            </div>
        </div>
    </>);
};

export default DashboardMyAccountLayout;