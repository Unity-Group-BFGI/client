import { useSelector } from "react-redux";
import { DashboardHeaderLg, DashboardHeaderSm } from "../Components/Headers";

const DashboardIeltsLmsLayout = ({children}) => {
    const { Y } = useSelector( state => state.theme );
    return (<>
        <DashboardHeaderLg />
        <div className={Y > 100? "content d-flex flex-column flex-column-fluid pt-custom" : "content d-flex flex-column flex-column-fluid"}>
            <div className="container-xxl pb-12">
                <DashboardHeaderSm />
                {children}
            </div>
        </div>
    </>);
};

export default DashboardIeltsLmsLayout;