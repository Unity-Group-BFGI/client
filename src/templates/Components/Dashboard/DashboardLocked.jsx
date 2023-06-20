import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import "../../../assets/styles/dashboard.locked.css";
// import { auth_tokens } from "../../../includes/Store/slice/Auth.slice";
import { theme_update } from "../../../includes/Store/slice/Theme.slice";
import DashboardPreLoader from "./DashboardPreLoader";



const DashboardLocked = () => {
    const dispatch = useDispatch();
    const { IS_USER_LOGGED_IN, AUTH_LOADED /* AUTH_TOKENS */ } = useSelector(state => state.auth);

    /*
    const updateResponse = (json) => {
        
        if(json.status){
            if(json.hasJson){
                if(json.headers){
                    dispatch(auth_tokens({
                        refreshToken: json.headers.refreshToken,
                        accessToken: json.headers.accessToken
                    }));
                    localStorage.setItem('locked',false);
                    dispatch(theme_update({
                        LOCKED: false
                    }));
                    console.info("locked",false);
                }
            }
        }
    };
    */

    const unlock = (ev) => {
        /*
        refreshAuth({
            "x-rs-token": "Refresh "+AUTH_TOKENS.refreshToken,
            "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
        },"",{},
        () => {
            ev.target.disabled = true;
        },(res) => { 
            ev.target.querySelector('span').classList.toggle('unlocked');
            ev.target.disabled = false;
            updateResponse(res);
        },(err) => {
            ev.target.disabled = false;
        });
        */
        dispatch(theme_update({
            LOCKED: false
        }));
        
    };

    return (AUTH_LOADED && IS_USER_LOGGED_IN? 
        <div className="d-flex flex-column flex-root">
            <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed auth-page-bg">
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                    <Link to={"/"} className="mb-12">
                        <img src={"/assets/svg/site-logo.svg"} alt="Site-logo" className="h-60px" />
                    </Link>
                    <div className="w-lg-550px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                        <div className="w-100">
                            <div className="text-center mb-10">
                                <h1 className="text-dark mb-3">Arjun Singh</h1>
                                <div className="text-gray-400 fw-semibold fs-4">
                                    Please unlock for visiting dashboard
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-lg btn-primary fw-bold w-100 d-flex flex-row justify-center align-items-center lock-btn" onClick={(event) => unlock(event)}>
                                    <span className="lock mr-2"></span> Unlock
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <DashboardPreLoader />
    );
};

export default DashboardLocked;