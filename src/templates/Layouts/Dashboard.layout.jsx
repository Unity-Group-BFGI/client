import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from "react-redux";


import DashboardSidebar from '../Components/Sidebars/DashboardSidebar';
import DashboardApiFailed from '../Components/Dashboard/DashboardApiFailed';
import DashboardPreLoader from '../Components/Dashboard/DashboardPreLoader';
import DashboardLocked from '../Components/Dashboard/DashboardLocked';

import { api_update, api_loading } from "../../includes/Store/slice/Api.slice";
import { user_update } from "../../includes/Store/slice/MyAccount.slice";
import { sidebar } from "../../includes/Store/slice/Theme.slice";
import verifyUser from "../../includes/Apis/verifyUser";



const DashboardLayout = ({children}) => {
    const navigate = useNavigate();
    const { API_FAILED, API_LOADED, API_VERIFIED, API_CALLED } = useSelector( state => state.api );
    const { IS_USER_LOGGED_IN, AUTH_LOADED, AUTH_TOKENS } = useSelector(state => state.auth );
    const { SIDEBAR, WIDTH, LOCKED } = useSelector(state => state.theme);

    const dispatch = useDispatch();
    // set api response
    const setApiResponse = (b = false, data  = {}) => {
        if(b){
            // display step form
            dispatch(api_update({
                API_LOADING: false,
                API_FAILED: false,
                API_LOADED: false,
                API_VERIFIED: false,
                API_CALLED: true
            }));
            
        } else {
            // verify user
            
            /*accountDispatch({
                type: "ACCOUNT_UPDATE",
                payload: {
                    USER: data.user,
                    USERMETA: data.usermeta
                }
            }); */ 
            dispatch(api_update({
                API_FAILED: false,
                API_LOADED: true,
                API_VERIFIED: true,
                API_CALLED: true
            })); 

            dispatch(user_update({
                USER: data.user,
                USERMETA: data.usermeta
            }));

            setTimeout(() => {
                dispatch(api_loading(false));
            },2000);

        }
    };

    // call user token api
    const callApi = () => {
        dispatch(api_update({
            API_LOADING: true,
            API_FAILED: false,
            API_LOADED: false,
            API_VERIFIED: false,
            API_CALLED: false
        }));
        
        setTimeout(() => {
            verifyUser(
                {
                    "authorization": "Bearer "+AUTH_TOKENS.accessToken,
                    "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
                },
                "",
                {
                    "action"    : "verify-account"
                },() => {
                    dispatch(api_update({
                        API_LOADING: true,
                        API_FAILED: false,
                        API_LOADED: false,
                        API_VERIFIED: false,
                        API_CALLED: false
                    }));                 
                },(res) => {
                    if(res.status){
                        if(res.hasJson){
                            if(res.json.action === "verify-account"){
                                if(res.json.userFound){
                                    setApiResponse(false, res.json);
                                }  else {
                                    setApiResponse(true, {});
                                }
                            } else {
                                console.warn("unknown action returns");
                            }
                        }
                    } else {
                        console.warn(res.res);
                    }
                },(err) => {
                    dispatch(api_update({
                        API_LOADING: false,
                        API_FAILED: true,
                        API_LOADED: false,
                        API_VERIFIED: false
                    }));                               
                }
            );
        },2000);
    };

    useEffect(() => {
        if(AUTH_LOADED){
            if(IS_USER_LOGGED_IN){
                if(!API_CALLED){
                    callApi();
                }
            } else {
                navigate("/");
            }
        }
    },[AUTH_LOADED, IS_USER_LOGGED_IN, API_VERIFIED]);

    return (<>
        <Helmet>
            <link rel="stylesheet" href="/assets/css/dashboard.bundle.css" />
        </Helmet>     
        {LOCKED? <><DashboardLocked /></> : <> 
            {API_FAILED? <DashboardApiFailed /> : <>
                    
                    {
                        !API_LOADED? <DashboardPreLoader />: API_LOADED && API_VERIFIED && <>
                            
                        <div className="d-flex flex-column flex-root">
                            <div className="page d-flex flex-row flex-column-fluid">
                                <DashboardSidebar />
                                <div className={WIDTH > 991? (SIDEBAR? "wrapper d-flex flex-column flex-row-fluid pl-aside-custom pb-45" : "wrapper d-flex flex-column flex-row-fluid pl-aside-custom-100 pb-45") : "wrapper d-flex flex-column flex-row-fluid pb-45"}>
                                    {children}
                                </div>
                            </div>
                        </div>

                        {(SIDEBAR) && WIDTH < 991 && <div className='drawer-overlay' onClick={() => dispatch(sidebar(!SIDEBAR))}></div>}
                        

                    </>}
            </>}
        </>}
    </>);
};

export default DashboardLayout;