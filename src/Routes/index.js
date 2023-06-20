import { Route, Routes as Switch } from "react-router-dom";


import Homepage from "../Pages/Homepage";
import AboutUs from "../Pages/AboutUs";
import Support from "../Pages/Support";
import Pricing from "../Pages/Pricing";
import Dashboard from "../Pages/Dashboard";
import { 
    DashboardMyAccount, 
    DashboardMyAccountOverview, 
    DashboardMyAccountSettings, 
    DashboardMyAccountSecurity, 
    DashboardMyAccountBillings, 
    DashboardMyAccountLogs 
} from "../Pages/Dashboard/MyAccount";

import {
    DashboardIeltsLms,
    DashboardIeltsLmsFreeQuizzes,
    DashboardIeltsLmsMyQuizzes,
    DashboardIeltsLmsEditQuiz
} from "../Pages/Dashboard/IeltsLms";

import NotFound from "../Pages/NotFound";


const Routes = () => {
    return (<>
        <Switch>
            <Route exact path={"/"} element={<Homepage />} />
            <Route exact path={"/about"} element={<AboutUs />} />
            <Route exact path={"/support"} element={<Support />} />
            <Route exact path={"/pricing"} element={<Pricing />} />
            <Route exact path={"/dashboard"} element={<Dashboard />} >
                <Route exact path={"/dashboard/my-account"} element={<DashboardMyAccount />}>
                    <Route exact path={"/dashboard/my-account/overview"} element={<DashboardMyAccountOverview />} />
                    <Route exact path={"/dashboard/my-account/settings"} element={<DashboardMyAccountSettings />} />
                    <Route exact path={"/dashboard/my-account/security"} element={<DashboardMyAccountSecurity />} />
                    <Route exact path={"/dashboard/my-account/billings"} element={<DashboardMyAccountBillings />} />
                    <Route exact path={"/dashboard/my-account/logs"} element={<DashboardMyAccountLogs />} />
                </Route>
                <Route exact path={"/dashboard/ielts-lms"} element={<DashboardIeltsLms />}>
                    <Route exact path={"/dashboard/ielts-lms/free"} element={<DashboardIeltsLmsFreeQuizzes />} />
                    <Route exact path={"/dashboard/ielts-lms/my"} element={<DashboardIeltsLmsMyQuizzes />} />
                    <Route exact path={"/dashboard/ielts-lms/quiz/edit/:id"} element={<DashboardIeltsLmsEditQuiz />} />
                </Route>
            </Route>
            <Route path='*' element={<NotFound />}/>
            
        </Switch>
    </>);
};
export default Routes;