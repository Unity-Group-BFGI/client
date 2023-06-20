import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebar } from "../../../includes/Store/slice/Theme.slice";
import HeaderActions from "./HeaderActions";
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';


const HeaderLg = () => {
    const dispatch = useDispatch();
    const { CURRENT_ROUTE } = useSelector( state => state.route );
    const { API_LOADING } = useSelector( state => state.api );
    const { SIDEBAR, Y, WIDTH } = useSelector(state => state.theme );

    const [parentHeading,setParentHeading] = useState("");
    const [childHeading,setChildHeading] = useState("");
    const [subChildHeading,setSubChildHeading] = useState("");

    useEffect(() => {
        if(CURRENT_ROUTE){
            if(CURRENT_ROUTE.parentHeading){ setParentHeading(CURRENT_ROUTE.parentHeading); }
            if(CURRENT_ROUTE.childHeading){ setChildHeading(CURRENT_ROUTE.childHeading); }
            if(CURRENT_ROUTE.subChildHeading){ setSubChildHeading(CURRENT_ROUTE.subChildHeading); }
        }
    },[CURRENT_ROUTE]);

    return (<>
        <div className={WIDTH > 991? (Y >= 100? (SIDEBAR? 'header header-sticky pl-header-custom' : 'header header-sticky pl-header-custom-100') : 'header') : (Y >= 100? 'header header-sticky': 'header')}>
            <div className="container-xxl d-flex align-items-center justify-content-between">
                
                <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0">
                    <h1 className="text-dark fw-semibold my-0 fs-2">
                        Dashboard
                    </h1>
                    
                    <ul className="breadcrumb breadcrumb-line text-muted fw-semibold fs-base my-1">
                        {API_LOADING? <>
                            <li className={"breadcrumb-item text-muted"}>
                                <Placeholder animation="glow">
                                    <Placeholder style={{width: "55px"}} xs={4} />           
                                </Placeholder>
                            </li>
                            <li className={"breadcrumb-item text-muted"}>
                                <Placeholder animation="glow">
                                    <Placeholder style={{width: "65px"}} xs={4} />           
                                </Placeholder>
                            </li>
                            <li className={"breadcrumb-item text-dark"}>
                                <Placeholder animation="glow">
                                    <Placeholder style={{width: "65px"}} xs={4} />           
                                </Placeholder>
                            </li>
                        </> : <>
                            {parentHeading && <li className="breadcrumb-item text-muted">{parentHeading}</li>}
                            {childHeading && <li className={subChildHeading? "breadcrumb-item text-muted" : "breadcrumb-item text-dark"}>{childHeading}</li>}
                            {childHeading && subChildHeading && <li className={"breadcrumb-item text-dark"}>{subChildHeading}</li>}
                        </>}
                        
                    </ul>
                    
                </div>
        
                
                <div className="d-flex d-lg-none align-items-center ms-n2 me-2">
                    <div className="btn btn-icon btn-active-icon-primary" onClick={() => dispatch(sidebar(!SIDEBAR))}>
                        <span className="svg-icon svg-icon-2x">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
                                <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </div>
                    <a href="/dashboard" className="d-flex align-items-center">
                        <img alt="Logo" src={"https://preview.keenthemes.com/seven-html-pro/assets/media/logos/logo-default.svg"} className="h-40px" />
                    </a>
                </div>                   

                <div className="d-flex flex-shrink-0">
                    {CURRENT_ROUTE && CURRENT_ROUTE.actions && <>
                        {CURRENT_ROUTE.actionsHtml.length > 0 && CURRENT_ROUTE.actionsHtml.map((action,index) => {
                            return <HeaderActions key={index} action={action} />
                        })}
                    </>}
                </div>

            </div>
        </div>
        {Y >= 100 && 
        <div className={WIDTH > 991? (Y >= 100? (SIDEBAR? 'header opacity-0 pointer-events-none' : 'header opacity-0 pointer-events-none') : 'header opacity-0 pointer-events-none') : (Y >= 100? 'header opacity-0 pointer-events-none': 'header opacity-0 pointer-events-none')}>
            <div className="container-xxl d-flex align-items-center justify-content-between">
                
                <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0">
                    <h1 className="text-dark fw-semibold my-0 fs-2">
                        Dashboard
                    </h1>
                    
                    <ul className="breadcrumb breadcrumb-line text-muted fw-semibold fs-base my-1">
                        {API_LOADING? <>
                            <li className={"breadcrumb-item text-muted"}>
                                <Placeholder animation="glow">
                                    <Placeholder style={{width: "55px"}} xs={4} />           
                                </Placeholder>
                            </li>
                            <li className={"breadcrumb-item text-muted"}>
                                <Placeholder animation="glow">
                                    <Placeholder style={{width: "65px"}} xs={4} />           
                                </Placeholder>
                            </li>
                            <li className={"breadcrumb-item text-dark"}>
                                <Placeholder animation="glow">
                                    <Placeholder style={{width: "65px"}} xs={4} />           
                                </Placeholder>
                            </li>
                        </> : <>
                            {parentHeading && <li className="breadcrumb-item text-muted">{parentHeading}</li>}
                            {childHeading && <li className={subChildHeading? "breadcrumb-item text-muted" : "breadcrumb-item text-dark"}>{childHeading}</li>}
                            {childHeading && subChildHeading && <li className={"breadcrumb-item text-dark"}>{subChildHeading}</li>}
                        </>}
                        
                    </ul>
                    
                </div>
        
                
                <div className="d-flex d-lg-none align-items-center ms-n2 me-2">
                    <div className="btn btn-icon btn-active-icon-primary" onClick={() => dispatch(sidebar(!SIDEBAR))}>
                        <span className="svg-icon svg-icon-2x">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
                                <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </div>
                    <a href="/dashboard" className="d-flex align-items-center">
                        <img alt="Logo" src={"https://preview.keenthemes.com/seven-html-pro/assets/media/logos/logo-default.svg"} className="h-40px" />
                    </a>
                </div>                   

                <div className="d-flex flex-shrink-0">
                    {CURRENT_ROUTE && CURRENT_ROUTE.actions && <>
                        {CURRENT_ROUTE.actionsHtml.length > 0 && CURRENT_ROUTE.actionsHtml.map((action,index) => {
                            return <HeaderActions key={index} action={action} />
                        })}
                    </>}
                </div>

            </div>
        </div>}
    </>);
};

const HeaderSm = () => {
    const { CURRENT_ROUTE } = useSelector( state => state.route );
    const { API_LOADING } = useSelector( state => state.api );
    const { WIDTH, Y } = useSelector( state => state.theme );

    const [parentHeading,setParentHeading] = useState("");
    const [childHeading,setChildHeading] = useState("");
    const [subChildHeading,setSubChildHeading] = useState("");

    useEffect(() => {
        if(CURRENT_ROUTE){
            if(CURRENT_ROUTE.parentHeading){ setParentHeading(CURRENT_ROUTE.parentHeading); }
            if(CURRENT_ROUTE.childHeading){ setChildHeading(CURRENT_ROUTE.childHeading); }
            if(CURRENT_ROUTE.subChildHeading){ setSubChildHeading(CURRENT_ROUTE.subChildHeading); }
        }
    },[CURRENT_ROUTE]);
   
    return (WIDTH < 991?
        <div className={"container-xxl d-flex align-items-center justify-content-between"}>
                
            <div className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-2 pb-5 pb-lg-0">
                <h1 className="text-dark fw-semibold my-0 fs-2">
                    Dashboard
                </h1>
                <ul className="breadcrumb breadcrumb-line text-muted fw-semibold fs-base my-1">
                    {!API_LOADING && parentHeading && <li className="breadcrumb-item text-muted">{parentHeading}</li>}
                    {!API_LOADING && childHeading && <li className={subChildHeading? "breadcrumb-item text-muted" : "breadcrumb-item text-dark"}>{childHeading}</li>}
                    {!API_LOADING && childHeading && subChildHeading && <li className={"breadcrumb-item text-dark"}>{subChildHeading}</li>}
                </ul>
            </div>

            <div className="d-flex flex-shrink-0">
                
            </div>

        </div>
        :
        <></>
    );
};

export { HeaderLg as DashboardHeaderLg, HeaderSm as DashboardHeaderSm };