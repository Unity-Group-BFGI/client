import { useSelector } from "react-redux";
import DashboardPrimaryMenu from "./DashboardPrimaryMenu";
import DashboardSecondaryMenu from "./DashboardSecondaryMenu";

import { useEffect } from "react";

const DashboardSidebar = () => {
    
    const { SIDEBAR, WIDTH } = useSelector(state => state.theme);
    useEffect(() => {
        if(document.querySelector('[data-kt-aside-minimize]')){
            document.querySelector('[data-kt-aside-minimize]').dataset.ktAsideMinimize = SIDEBAR? "off" : "on";
        }
    },[SIDEBAR]);
    return (
        <div className={WIDTH > 991? ("aside aside-extended aside-fixed-on") : SIDEBAR? "aside aside-extended drawer drawer-start drawer-on" : "aside aside-extended drawer drawer-start "}>
            <DashboardPrimaryMenu />
            <DashboardSecondaryMenu />
        </div>
        
            /* 
        <div className={WIDTH > 991? "aside aside-extended" : SIDEBAR? "aside aside-extended drawer drawer-start drawer-on" : "aside aside-extended drawer drawer-start "}>
            <DashboardPrimaryMenu />
            <DashboardSecondaryMenu />
            
        </div> 
            */
    

    );
};

export default DashboardSidebar;