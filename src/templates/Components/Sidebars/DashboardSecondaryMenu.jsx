import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { set_sub_child } from "../../../includes/Store/slice/Route.slice";
import { MyAccountRoutes, IeltsLmsRoutes } from "../../../includes/Constents/DashboardSecondaryMenuItems.constens";

import SecondryMenuSkeleton from "../Skeletons/SecondryMenu.skeleton";
import DynamicMenuSkeleton from "../Skeletons/DynamicMenu.skeleton";
import IconLoader from "../Icons";
import SvgLoader from "../../../includes/Constents/Svgs.contents";

const DashboardSecondaryMenu = () => {
    const { PARENT } = useSelector(state => state.route );
    const { API_LOADING } = useSelector(state => state.api);
    const [menu,setMenu] = useState(<>Loading...</>);

    useEffect(() => {
        if(PARENT === "my-account"){
            setMenu(<MyAccountSecondaryMenu />);
        } else if(PARENT === "ielts-lms") {
            setMenu(<IeltsLmsSecondaryMenu />);
        } else {
            setMenu(<>Loading...</>);
        }
    },[PARENT]);

    return (<div className="aside-secondary d-flex flex-row-fluid">
        <div className="aside-workspace my-5 p-5">
            <div className="d-flex h-100 flex-column">
                <div className="flex-column-fluid">
                    <div className="tab-content">
                        {API_LOADING? <SecondryMenuSkeleton /> : menu }     
                    </div>
                    
                </div>
            </div>
        </div>
    </div>);
};

export default DashboardSecondaryMenu;


const MyAccountSecondaryMenu = () => {
    const [menu,setMenu] = useState([]);
    const { CHILD } = useSelector(state => state.route );
    useEffect(() => {
        if(MyAccountRoutes && MyAccountRoutes.length > 0){
            setMenu(MyAccountRoutes);
        }
    },[]);
    
    return (
        <>
            <div className="menu menu-column menu-sub-indention menu-rounded menu-active-bg menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-500 fw-semibold fs-6 px-2 my-5 my-lg-0">
                <div className="menu-item">

                    <div className="menu-content pb-2">
                        <span className="menu-section text-muted text-uppercase fs-8 ls-1">My Account</span>
                    </div>

                    {
                        menu.length > 0 && menu.map(m => {
                            
                            return ( m.menu? <Link key={m.key} to={m.href} className={CHILD === m.child? "menu-link active" : "menu-link"}>
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <IconLoader icon={m.icon} />
                                    </span>
                                </span>
                                <span className="menu-title">{m.childHeading}</span>
                            </Link> : <div key={m.key} style={{display: "contents"}}></div>
                            )
                            
                        })
                        
                    }


                </div>
            </div>
        </>
    );
};

const IeltsLmsSecondaryMenu = () => {
    const dispatch = useDispatch();
    const [menu,setMenu] = useState([]);
    const [hasSubRoutes,setHasSubRoutes] = useState(false);
    const { CHILD, SUB_CHILD, CURRENT_ROUTE, DYNAMIC_ROUTES_LOADING, HAS_DYNAMIC_ROUTES, DYNAMIC_ROUTES } = useSelector(state => state.route );
    const switchSubChild = (sc) => {
        if(sc){ dispatch(set_sub_child(sc)); }
    }
    
    useEffect(() => {
        if(IeltsLmsRoutes && IeltsLmsRoutes.length > 0){
            setMenu(IeltsLmsRoutes);
            if(HAS_DYNAMIC_ROUTES){
                setHasSubRoutes(true);
            }
        }
    },[CURRENT_ROUTE]);
    
    return (
        <>
            <div className="menu menu-column menu-sub-indention menu-rounded menu-active-bg menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-500 fw-semibold fs-6 px-2 my-5 my-lg-0">
                <div className="menu-item">

                    {/* BEGIN::DYNAMIC ROUTES */}
                    {hasSubRoutes && <>
                        <button className={"menu-link active unset-custom"} type="button" onClick={() => setHasSubRoutes(false)}>
                            <span className="menu-icon">
                                <span className="svg-icon svg-icon-2">
                                    <i className="fa fa-thin fa-chevron-left"></i>
                                </span>
                            </span>
                            <span className="menu-title">Back to Quizzes</span>
                        </button>
                        <div className="menu-content pb-2 mb-2">
                            <span className="menu-section text-muted text-uppercase fs-8 ls-1">Editable Options</span>
                        </div>
                        {DYNAMIC_ROUTES_LOADING? <>
                            <DynamicMenuSkeleton /> 
                            <DynamicMenuSkeleton />
                            <DynamicMenuSkeleton />
                            <DynamicMenuSkeleton />
                            <DynamicMenuSkeleton />
                        </>
                        : 
                        <>
                            
                            {
                                DYNAMIC_ROUTES.length > 0 && DYNAMIC_ROUTES.map((dr,index) => {
                                    return (
                                            <div key={index} className={dr.slug === SUB_CHILD? "d-flex align-items-center mb-3 subchild active "+dr.activeClass : "d-flex subchild align-items-center mb-3"} type="button" onClick={() => switchSubChild(dr.slug)}>
                                                <div className="symbol symbol-50px me-5">
                                                    <span className={"symbol-label "+ dr.iconBgColorClass}>
                                                    
                                                        <span className={"svg-icon svg-icon-2x "+ dr.iconColorClass}>
                                                            <SvgLoader type={dr.icon} />
                                                        </span>
                                                                    
                                                    </span>
                                                </div>                                      
                                                <div className="d-flex flex-column">
                                                    <p className="text-gray-800 text-hover-primary fs-6 fw-semibold mb-0">{dr.subChildHeading}</p>
                                                    <span className="text-muted fw-semibold">{dr.subChildSubHeading}</span>
                                                </div>
                                    
                                            </div>
                                    )
                                })
                            }
                        </>}
                    </>}
                    {/* END::DYNAMIC ROUTES */}


                    {/* BEGIN::CHILD ROUTES */}    
                    {!hasSubRoutes && <>
                        {/* BEGIN::dynamic options for dynamic routes */}
                        {HAS_DYNAMIC_ROUTES && CHILD === "ielts-lms-edit-quiz" && <>
                            <button className={"menu-link active unset-custom"} type="button" onClick={() => setHasSubRoutes(true)}>
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <i className="fa fa-thin fa-chevron-left"></i>
                                    </span>
                                </span>
                                <span className="menu-title">Back to Edit Quiz</span>
                            </button>
                        </>}
                        {/* END::dynamic options for dynamic routes */}

                        <div className="menu-content pb-2">
                            <span className="menu-section text-muted text-uppercase fs-8 ls-1">Ielts Lms</span>
                        </div>

                        {menu.length > 0 && menu.map(m => {                          
                            return ( m.menu? <Link key={m.key} to={m.href} className={CHILD === m.child? "menu-link active" : "menu-link"}>
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <IconLoader icon={m.icon} />
                                    </span>
                                </span>
                                <span className="menu-title">{m.childHeading}</span>
                            </Link> : <div key={m.key} style={{display: "contents"}}></div>)
                                
                        })}
                    </>}
                    {/* END::CHILD ROUTES */}    

                </div>
            </div>
        </>
    );
};

