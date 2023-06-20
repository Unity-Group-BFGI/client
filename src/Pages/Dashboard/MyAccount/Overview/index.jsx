import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { MyAccountRoutes } from "../../../../includes/Constents/DashboardSecondaryMenuItems.constens";
import { route_update } from "../../../../includes/Store/slice/Route.slice";
import { sidebar } from "../../../../includes/Store/slice/Theme.slice";
import Placeholder from 'react-bootstrap/Placeholder';


const Overview = () => {
    const parent            = "my-account";
    const child             = "my-account-overview";
    const { USERMETA }      = useSelector(state => state.user );
    const { WIDTH } = useSelector( state => state.theme);
    const { API_LOADING }   = useSelector(state => state.api );
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

    const [user,setUser] = useState({
        firstName : "",
        lastName: "",
        mobile: "+91 ",
        email: "",
        country: "",
        state: ""
    });


    useEffect(() => {
        let tmpCr = MyAccountRoutes.length > 0 && MyAccountRoutes.filter((item) => {
            return (item.child === child)
        });

        if(tmpCr.length === 1) {

            window.document.title = "Overview | My Account";

            dispatch(route_update({
                PARENT: parent,
                CHILD: child,
                CURRENT_ROUTE: tmpCr[0],
                HAS_DYNAMIC_ROUTES: tmpCr[0].dynamicRoute,
                DYNAMIC_ROUTES_LOADING: tmpCr[0].dynamicRoute
            }));

            WIDTH < 991 && dispatch(sidebar(false));

            if(!API_LOADING){
                setLoading(false);
                setUser({
                    ...user,
                    firstName: USERMETA.firstName || "",
                    lastName: USERMETA.lastName || "",
                    mobile: USERMETA.countryCode+" "+USERMETA.mobile || "+91 ***** *****",
                    phone: USERMETA.phone || "**********",
                    email: USERMETA.email || "",
                    country: USERMETA.country || "",
                    state: USERMETA.state || ""
                });
            }
        }

    },[MyAccountRoutes,API_LOADING]);


    return (<>
        <div className="card mb-5 mb-xl-10">

            <div className="card-header cursor-pointer">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Profile Details</h3>
                </div>
                {loading? <Placeholder.Button className={"btn btn-sm btn-primary align-self-center w-100px"} variant="primary" xs={6} /> 
                    : 
                <Link to={"/dashboard/my-account/settings"} className="btn btn-sm btn-primary align-self-center">Edit Profile</Link>}
            </div>

            <div className="card-body p-9">
                {/* fullname */}
                <div className="row mb-7">

                    {loading? <> 
                        <Placeholder className={"col-lg-4 fw-semibold text-muted"} animation="glow">
                            <Placeholder sx="4" />
                        </Placeholder>
                    </> : <>
                        <label className="col-lg-4 fw-semibold text-muted">Full Name</label>            
                        <div className="col-lg-8">                    
                            <span className="fw-bold fs-6 text-gray-800">{user.firstName+" "+user.lastName}</span>                
                        </div>
                    </>}
                    
                
                </div>

                {/* mobile number */}        
                <div className="row mb-7">
                    {loading? <> 
                        <Placeholder className={"col-lg-4 fw-semibold text-muted"} animation="glow">
                            <Placeholder sx="4" />
                        </Placeholder>
                    </> : <>
                        <label className="col-lg-4 fw-semibold text-muted">Mobile no.</label>            
                        <div className="col-lg-8">                    
                            <span className="fw-bold fs-6 text-gray-800 me-2">{user.mobile}</span>
                                           
                        </div>
                    </>}
                </div>


                {/* Email address */}        
                <div className="row mb-7">
                    {loading? <> 
                        <Placeholder className={"col-lg-4 fw-semibold text-muted"} animation="glow">
                            <Placeholder sx="4" />
                        </Placeholder>
                    </> : <>
                        <label className="col-lg-4 fw-semibold text-muted">Email.</label>            
                        <div className="col-lg-8">                    
                            <span className="fw-bold fs-6 text-gray-800 me-2">{user.email}</span>  
                            <span className="badge badge-success">Verified</span>               
                        </div>
                    </>}
                </div>

                {/* Country */}        
                <div className="row mb-7">
                    {loading? <> 
                        <Placeholder className={"col-lg-4 fw-semibold text-muted"} animation="glow">
                            <Placeholder sx="4" />
                        </Placeholder>
                    </> : <>
                        <label className="col-lg-4 fw-semibold text-muted">Country</label>            
                        <div className="col-lg-8">                    
                            <span className="fw-bold fs-6 text-gray-800">{user.country}</span>                
                        </div>
                    </>}
                </div>

                {/* State */}        
                <div className="row mb-7">
                    {loading? <> 
                        <Placeholder className={"col-lg-4 fw-semibold text-muted"} animation="glow">
                            <Placeholder sx="4" />
                        </Placeholder>
                    </> : <>
                        <label className="col-lg-4 fw-semibold text-muted">State</label>            
                        <div className="col-lg-8">                    
                            <span className="fw-bold fs-6 text-gray-800">{user.state}</span>                
                        </div>
                    </>}
                </div>


            </div>
        </div>
    </>);
};
export default Overview;