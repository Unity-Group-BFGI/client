import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { route_update } from "../../../../includes/Store/slice/Route.slice";
import { sidebar } from "../../../../includes/Store/slice/Theme.slice";
import { MyAccountRoutes } from "../../../../includes/Constents/DashboardSecondaryMenuItems.constens";
import Form from 'react-bootstrap/Form';



const Settings = () => {
    const parent    = "my-account";
    const child     = "my-account-settings";
    const title     = "Edit Profile | My Account"
    const dispatch  = useDispatch();
    const { API_LOADING } = useSelector( state => state.api );
    const { USERMETA }= useSelector( state => state.user );
    const { WIDTH } = useSelector( state => state.theme);
    const [validated, setValidated] = useState(false);
    const [user,setUser] = useState({
        firstName : "",
        lastName: "",
        mobile: "",
        phone: "",
        email: "",
        country: "",
        state: ""
    });

    const discard = () => {
        setUser({
            ...user,
            firstName: USERMETA.firstName || "",
            lastName: USERMETA.lastName || "",
            mobile: +USERMETA.mobile || "",
            phone: +USERMETA.phone || "",
            email: USERMETA.email || "",
            country: USERMETA.country || "",
            state: USERMETA.state || ""
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
    
        setValidated(true);
    };


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

            if(!API_LOADING){
                setUser({
                    ...user,
                    firstName: USERMETA.firstName || "",
                    lastName: USERMETA.lastName || "",
                    mobile: +USERMETA.mobile || "",
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
            <div className="card-header border-0 cursor-pointer">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">Edit Profile</h3>
                </div>
            </div>
            <div className="collapse show">
                <Form className="form fv-plugins-bootstrap5 fv-plugins-framework" noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="card-body border-top p-9">

                        {/* full name */}     
                        <div className="row mb-6">
                            <label className="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
                            <div className="col-lg-8">
                                
                                <div className="row">
                                    
                                    <div className="col-lg-6 fv-row">
                                        <input 
                                            onKeyUp={(event) => setValidated(true)}
                                            required 
                                            type="text" 
                                            name="firstName" 
                                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0" 
                                            placeholder="First name*" 
                                            value={user.firstName} 
                                            onChange={(event) => setUser({
                                                ...user,
                                                firstName: event.target.value
                                            })}
                                        />
                                        <div className="invalid-feedback">First name is required</div>
                                    </div>                               
                                    
                                    <div className="col-lg-6 fv-row">
                                        <input
                                            type="text" 
                                            name="lastName" 
                                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-0 no-validate" 
                                            placeholder="Last name" 
                                            value={user.lastName} 
                                            onChange={(event) => setUser({
                                                ...user,
                                                lastName: event.target.value
                                            })}
                                        />
                                        <div className="invalid-feedback"></div>
                                    </div>

                                    
                                </div>
                                
                            </div>
                        </div>

                        {/* modile number */}
                        <div className="row mb-6">
                        
                            <label className="col-lg-4 col-form-label fw-semibold required fs-6">
                                Mobile no.
                            </label>
                                            
                            <div className="col-lg-8 fv-row">
                                <input 
                                    required
                                    onKeyUp={(event) => setValidated(true)}
                                    type="number" 
                                    name="mobile" 
                                    className="form-control form-control-lg form-control-solid" 
                                    placeholder="Mobile number" 
                                    value={user.mobile} 
                                    onChange={(event) => setUser({
                                        ...user,
                                        mobile: event.target.value
                                    })}        
                                />
                                <div className="invalid-feedback">Mobile number is required</div>
                            </div>
                            
                        </div>                        

                        {/* country */}
                        <div className="row mb-6">
                        
                            <label className="col-lg-4 col-form-label fw-semibold required fs-6">
                                Country.
                            </label>
                                            
                            <div className="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                <select 
                                    name="country"
                                    required 
                                    value={user.country}
                                    className="form-control form-select form-select-solid" 
                                    data-control="select2"
                                    onChange={(event) => setUser({
                                        ...user,
                                        country: event.target.value
                                    })}
                                >
                                    <option></option>
                                    <option value="IN">India</option>
                                    <option value="PAK">Pakistan</option>
                                </select>
                                <div className="invalid-feedback">Country is required</div>
                            </div>
                            
                        </div>  

                        {/* state */}
                        <div className="row mb-6">
                        
                            <label className="col-lg-4 col-form-label fw-semibold fs-6">
                                State.
                            </label>
                                            
                            <div className="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                <select 
                                    name="state"
                                    required 
                                    value={user.state}
                                    className="form-control form-select form-select-solid" 
                                    data-control="select2"
                                    onChange={(event) => setUser({
                                        ...user,
                                        state: event.target.value
                                    })}
                                >
                                    <option></option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                                <div className="invalid-feedback">State is required</div>
                            </div>
                            
                        </div>          

                    </div>
                    <div className="card-footer d-flex justify-content-end py-6 px-9">
                        <button type="button" className="btn btn-light btn-active-light-primary me-2" onClick={discard}> Discard </button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </Form>
            </div>
        </div>

        <div className="card mb-5 mb-xl-10">
            <div className="card-header border-0 cursor-pointer">
                <div className="card-title m-0">
                    <h3 className="fw-bold m-0">
                        Email Settings
                    </h3>      
                </div>
            </div>
        </div>

    </>);
};
export default Settings;