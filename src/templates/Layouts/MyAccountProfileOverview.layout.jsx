import { Link } from "react-router-dom";
import { MyAccountRoutes } from "../../includes/Constents/DashboardSecondaryMenuItems.constens";
import Placeholder from 'react-bootstrap/Placeholder';
import { useSelector } from "react-redux";

const DashboardMyAccountProfileOverview = () => {
    const { API_LOADING } =  useSelector(state => state.api );    
    const { CHILD } = useSelector(state => state.route );
    const { USER , USERMETA } =  useSelector(state => state.user );

    return (<>
    
        <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">

                {/*--begin::info--*/}
                <div className="d-flex flex-wrap flex-sm-nowrap mb-3">

                    {/*--begin::Pic--*/}
                    <div className="me-7 mb-4">
                        <div className="symbol symbol-70px symbol-fixed position-relative">
                            {API_LOADING? <>
                                <Placeholder as="div" animation="glow">
                                    <Placeholder xs={12} className={"h-70px w-70px"} />
                                </Placeholder>
                            </> : <>
                                <img src={USER.photoURL || ""} alt="Profile pic" />
                                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                            </>}
                        </div>
                    </div>
                    {/*--end::Pic--*/}

                    {/*--begin::info--*/}
                    <div className="flex-grow-1">

                        {/*--begin::title--*/}
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            {/*--begin::User--*/}
                            <div className="d-flex flex-column">
                                {/*--begin::name--*/}
                                <div className="d-flex align-items-center mb-1">
                                    <p className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">
                                        {API_LOADING? <>
                                            <Placeholder animation="glow" className={"mb-0"}>
                                                <Placeholder xs={12} className={"w-200px"} />
                                            </Placeholder>
                                        </> : USERMETA.firstName+" "+USERMETA.lastName}
                                    </p>                                  
                                </div>
                                {/*--end::User--*/}

                                {/*--begin::Info--*/}                     
                                
                                {API_LOADING? <>
                                    <Placeholder animation="glow" className={"d-flex flex-wrap fw-semibold fs-6 mb-2 pe-2"}>
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                </> : <div className="d-flex flex-wrap fw-semibold fs-6 mb-2 pe-2">
                                    <p className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">                                  
                                        <span className="svg-icon svg-icon-4 me-1">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor"></path>
                                                <path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor"></path>
                                                <rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor"></rect>
                                            </svg>
                                        </span>
                                        Customer
                                    </p>
                                    <p className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">                                     
                                        <span className="svg-icon svg-icon-4 me-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor"></path>
                                                <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                        {USER.email}
                                    </p>
                                </div>}
                                    
                                
                                {/*--end::Info--*/}  

                            </div>
                            {/*--end::User--*/}
                            
                        </div>
                        {/*--end::info--*/}    
                    </div>
                    {/*--end::info--*/}


                </div>
                {/*--end::info--*/}

                {/*--begin::Navs--*/}
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                    {
                        MyAccountRoutes.map( (route,index) => { 
                            if(route.menu){
                                return(
                                    <li className="nav-item mt-2" key={index}>
                                        {API_LOADING? <Placeholder as="a" animation="glow" className={"nav-link text-active-primary ms-0 me-5 py-5"}>
                                            <Placeholder xs={12} style={{minHeight: "25px", width: "100px"}} />
                                        </Placeholder> :
                                        <Link className={CHILD === route.child? "nav-link text-active-primary ms-0 me-10 py-5 active" : "nav-link text-active-primary ms-0 me-10 py-5"} to={route.href}>
                                            {route.childHeading}                   
                                        </Link>}
                                    </li>
                                )
                            } else {
                                return (<div style={{display:"contents"}} key={index}></div>)
                            }
                        })
                    }                 
                </ul>
                {/*--end::Navs--*/}
            </div>
        </div>    
    
    </>);
};

export default DashboardMyAccountProfileOverview;