import Placeholder from 'react-bootstrap/Placeholder';
const DynamicMenuSkeleton = () => {
    return (<>
        <div className={"menu-link d-flex flex-row align-items-stretch mb-2"} style={{border: "1px", padding: "5px 10px 5px 5px"}}>
            <Placeholder animation="glow" as="p" xs={2} className={"mr-2 d-flex custom-p"}>
                <Placeholder xs={12} style={{minHeight: "3rem"}} />
            </Placeholder>
            <Placeholder animation="glow" as="p" xs={10} className={"custom-p d-flex flex-column"}>
                <Placeholder xs={12} style={{minHeight: "1.1rem", marginTop: "2px", marginBottom: "5px"}} />
                <Placeholder xs={8} style={{minHeight: "1rem"}} />
            </Placeholder>
            
        </div>
    </>);
};

export default DynamicMenuSkeleton;