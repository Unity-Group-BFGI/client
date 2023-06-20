import Placeholder from 'react-bootstrap/Placeholder';
const SecondryMenuSkeleton = () => {
    return (<>
        <div className="menu menu-column menu-sub-indention menu-rounded menu-active-bg menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-arrow-gray-500 fw-semibold fs-6 px-2 my-5 my-lg-0">
            <div className="menu-item">
                <div className="menu-content pb-2">
                    <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                    <Placeholder animation="glow">
                        <Placeholder xs={4} style={{minHeight: "18px"}} />
                    </Placeholder>
                    </span>
                </div>
                <div className="menu-link d-block">
                    <Placeholder animation="glow">
                        <Placeholder xs={12} style={{minHeight: "30px"}} />
                    </Placeholder>
                </div>
                <div className="menu-link d-block">
                    <Placeholder animation="glow">
                        <Placeholder xs={12} style={{minHeight: "30px"}} />
                    </Placeholder>
                </div>
                <div className="menu-link d-block">
                    <Placeholder animation="glow">
                        <Placeholder xs={12} style={{minHeight: "30px"}} />
                    </Placeholder>
                </div>
                <div className="menu-link d-block">
                    <Placeholder animation="glow">
                        <Placeholder xs={12} style={{minHeight: "30px"}} />
                    </Placeholder>
                </div>
                <div className="menu-link d-block">
                    <Placeholder animation="glow">
                        <Placeholder xs={12} style={{minHeight: "30px"}} />
                    </Placeholder>
                </div>
                <div className="menu-link d-block">
                    <Placeholder animation="glow">
                        <Placeholder xs={12} style={{minHeight: "30px"}} />
                    </Placeholder>
                </div>
            </div>
        </div>
    </>);
};

export default SecondryMenuSkeleton;