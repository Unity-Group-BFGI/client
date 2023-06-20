import { Outlet } from "react-router-dom";
import DashboardMyAccountLayout from "../../../templates/Layouts/DashboardMyAccount.layout";

import Overview from "./Overview";
import Settings from "./Settings";
import Security from "./Security";
import Billings from "./Billings";
import Logs from "./Logs";

const MyAccountRoot = () => {
    return (<DashboardMyAccountLayout>
        <Outlet />
    </DashboardMyAccountLayout>);
};

export { 
    MyAccountRoot as DashboardMyAccount, 
    Overview as DashboardMyAccountOverview,
    Settings as DashboardMyAccountSettings,
    Security as DashboardMyAccountSecurity,
    Billings as DashboardMyAccountBillings,
    Logs as DashboardMyAccountLogs
}; 