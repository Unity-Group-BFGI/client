import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { route_update } from "../../../../includes/Store/slice/Route.slice";
import { sidebar } from "../../../../includes/Store/slice/Theme.slice";
import { MyAccountRoutes } from "../../../../includes/Constents/DashboardSecondaryMenuItems.constens";


const Logs = () => {
    const parent    = "my-account";
    const child     = "my-account-logs";
    const title     = "Logs | My Account"
    const dispatch  = useDispatch();
    const { API_LOADING } = useSelector( state => state.api );
    const { WIDTH } = useSelector( state => state.theme);
    const { USERMETA }= useSelector( state => state.user );
    useEffect(() => {
        let tmpCr = MyAccountRoutes.length > 0 && MyAccountRoutes.filter((item) => {
            return (item.child === child)
        });

        if(tmpCr.length === 1) {
            window.document.title = title;
            dispatch(route_update({
                PARENT: parent,
                CHILD: child,
                CURRENT_ROUTE: tmpCr[0],
                HAS_DYNAMIC_ROUTES: tmpCr[0].dynamicRoute,
                DYNAMIC_ROUTES_LOADING: tmpCr[0].dynamicRoute
            }));
            WIDTH < 991 && dispatch(sidebar(false));
        }

        
    },[MyAccountRoutes, API_LOADING]);
    return (<>
        My Account Logs
    </>);
};
export default Logs;