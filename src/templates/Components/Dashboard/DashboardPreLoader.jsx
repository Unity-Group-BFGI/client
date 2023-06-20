import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardAddUser from "./DashboardAddUser";

const DashboardPreLoader = () => {
    const { API_VERIFIED, API_CALLED, API_FAILED } = useSelector(state => state.api );
    
    const [pre,setPre] = useState(<DashboardLoading />);
    useEffect(() => {
        if(!API_FAILED){
            if(API_CALLED){
                if(!API_VERIFIED){
                    setPre(<DashboardAddUser />);
                }
            } else {
                setPre(<DashboardLoading />);
            }
        }
    },[API_CALLED,API_FAILED]);

    return (<div className="d-flex flex-column flex-root">
        {pre}
    </div>);
};

export default DashboardPreLoader;


const DashboardLoading = () => {
    return (<>
        <div className="page d-flex flex-column justify-content-center align-items-center" style={{height: "100%"}}>
            <div className="d-flex flex-column align-items-center">
                    <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <defs>
                            <filter id="ldio-6lzwrhc9atg-filter" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2.4000000000000004"></feGaussianBlur>
                                <feComponentTransfer result="cutoff">
                                    <feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1"></feFuncA>
                                </feComponentTransfer>
                            </filter>   
                        </defs>
                        <g filter="url(#ldio-6lzwrhc9atg-filter)"><g transform="translate(50 50)">
                        <g>
                        <circle cx="17" cy="0" r="5" fill="#e15b64">
                            <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="4s" repeatCount="indefinite" begin="-0.25s"></animate>
                        </circle>
                        <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="4s" repeatCount="indefinite" begin="0s"></animateTransform>
                        </g>
                        </g><g transform="translate(50 50)">
                        <g>
                        <circle cx="17" cy="0" r="5" fill="#f47e60">
                            <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="2s" repeatCount="indefinite" begin="-0.2s"></animate>
                        </circle>
                        <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="2s" repeatCount="indefinite" begin="-0.05s"></animateTransform>
                        </g>
                        </g><g transform="translate(50 50)">
                        <g>
                        <circle cx="17" cy="0" r="5" fill="#f8b26a">
                            <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="1.3333333333333333s" repeatCount="indefinite" begin="-0.15s"></animate>
                        </circle>
                        <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="1.3333333333333333s" repeatCount="indefinite" begin="-0.1s"></animateTransform>
                        </g>
                        </g><g transform="translate(50 50)">
                        <g>
                        <circle cx="17" cy="0" r="5" fill="#abbd81">
                            <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="1s" repeatCount="indefinite" begin="-0.1s"></animate>
                        </circle>
                        <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="1s" repeatCount="indefinite" begin="-0.15s"></animateTransform>
                        </g>
                        </g><g transform="translate(50 50)">
                        <g>
                        <circle cx="17" cy="0" r="5" fill="#849b87">
                            <animate attributeName="r" keyTimes="0;0.5;1" values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="0.8s" repeatCount="indefinite" begin="-0.05s"></animate>
                        </circle>
                        <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.8s" repeatCount="indefinite" begin="-0.2s"></animateTransform>
                        </g>
                        </g></g>
                    </svg>
                    <h3>Loading...</h3>
            </div>
        </div>
    </>);
};

