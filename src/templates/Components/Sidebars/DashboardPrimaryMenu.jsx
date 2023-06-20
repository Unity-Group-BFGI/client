import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLogo from "../Dashboard/DashboardLogo";
import Placeholder from "react-bootstrap/Placeholder";
import { parent } from "../../../includes/Store/slice/Route.slice";
import { theme, locked,  sidebar } from "../../../includes/Store/slice/Theme.slice";


import { DashboardPrimaryMenu_items } from "../../../includes/Constents/DashboardPrimaryMenuItems.constents";
import IconsLoader from "../Icons";



const DashboardPrimaryMenu = () => {
    const { API_LOADING } = useSelector(state => state.api);
    const { PARENT } = useSelector(state => state.route);
    const { THEME, SIDEBAR } = useSelector(state => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('theme')) {
            if(localStorage.getItem('theme') === "light" || localStorage.getItem('theme') === "dark"){
                dispatch(theme(localStorage.getItem('theme')));
                if(window.document.querySelector('[data-bs-theme]')){
                    window.document.querySelector('[data-bs-theme]').dataset.bsTheme = localStorage.getItem('theme');
                }
            }
        }
        
    },[])

    const themeUpdate = () => {
        if(THEME === "light"){
            dispatch(theme("dark"));
            if(window.document.querySelector('[data-bs-theme]')){
                window.document.querySelector('[data-bs-theme]').dataset.bsTheme = "dark";
                localStorage.setItem("theme","dark");
            }
        } else if(THEME === "dark"){
            dispatch(theme("light"));
            if(window.document.querySelector('[data-bs-theme]')){
                window.document.querySelector('[data-bs-theme]').dataset.bsTheme = "light";
                localStorage.setItem("theme","light");
            }
        }
    };

    const lockDashboard = () => {
        localStorage.setItem('locked', true);
        dispatch(locked(true));
        console.log("locked called");
    };

    return (<div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
        <DashboardLogo />
        <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid w-100 pt-5 pt-lg-0">
            <ul className="nav flex-column">
                {
                    DashboardPrimaryMenu_items.map((item,key) => {
                        return (<li key={key} className="nav-item mb-2">
                            {API_LOADING? <Placeholder animation="glow" className="d-block" style={{width: "50px", height: "47px", background: "#293658"}}>
                                <Placeholder xs={12} style={{minHeight: "47px"}} />
                            </Placeholder>                 
                            : 
                            <button onClick={() => { dispatch(parent(item.parent)) }} type='button' className={PARENT === item.parent? "nav-link btn btn-custom btn-icon active" :  "nav-link btn btn-custom btn-icon"}>
                                <span className="svg-icon svg-icon-2x">
                                    <IconsLoader icon={item.icon} />
                                </span>
                            </button>}
                        </li>)
                    })
                }
            </ul>
        </div>
        <div className="aside-footer d-flex flex-column align-items-center flex-column-auto">
            <div onClick={themeUpdate} className={"d-flex align-items-center mb-4"}>			
                <div className="btn btn-icon btn-custom">                                 
                    <span className="svg-icon svg-icon-2 svg-icon-lg-1">
                        {THEME === "light" && <IconsLoader icon={"moon"} />}
                        {THEME === "dark" && <IconsLoader icon={"sun"} />}
                    </span>
                </div>                              
            </div>
            <button type="button" 
                    onClick={() => dispatch(sidebar(!SIDEBAR))} 
                    className={!SIDEBAR? "d-flex align-items-center mb-4 active btn-primary btn-icon bg-body btn" : "btn d-flex align-items-center mb-4 bg-body btn-icon"}>
                <span className="svg-icon svg-icon-2 rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="currentColor"></rect>
                        <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="currentColor"></path>
                    </svg>
                </span>
            </button>

            <div onClick={lockDashboard} className={"d-flex align-items-center mb-10"}>			
                <div className="btn btn-icon btn-custom">                                 
                    <span className="svg-icon svg-icon-2 svg-icon-lg-1">
                        <IconsLoader icon={"fa-lock"} />
                    </span>
                </div>                              
            </div>
        </div>
    </div>);
};



export default DashboardPrimaryMenu;