import { Link } from 'react-router-dom';
const DashboardAddUser = () => {
    return (<>

        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed auth-page-bg">
            {/*--begin::Content--*/}
            <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                {/*--begin::Logo--*/}
                <Link to={"/"} className="mb-12">
                    <img alt="Logo" src="/assets/svg/site-logo.svg" className="h-60px" />
                </Link>     
                {/*--end::Logo--*/}
                {/*--begin::Wrapper--*/}
                <div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                    {/*--begin::Form--*/}
                    <form className="form w-100">
                        {/*--begin::Heading--*/}
                        <div className="mb-10 text-center">
                            {/*--begin::Title--*/}
                            <h1 className="text-dark mb-3">
                                Create an Account
                            </h1>
                            {/*--end::Title--*/}      
                            {/*--begin::Link--*/}
                            {/*--end::Link--*/}
                        </div>
                        {/*--end::Heading--*/}
                        {/*--begin::Action--*/}
                        {/*--end::Action--*/}
                        {/*--begin::Separator--*/}
                        {/*--end::Separator--*/}
                        {/*--begin::Input group--*/}
                        <div className="row fv-row mb-7 fv-plugins-icon-container">
                        {/*--begin::Col--*/}
                        <div className="col-xl-6">
                            <label className="form-label fw-bold text-dark fs-6">First Name</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder="" name="first-name" autocomplete="off" />
                            <div className="fv-plugins-message-container invalid-feedback"></div>
                        </div>
                        {/*--end::Col--*/}
                        {/*--begin::Col--*/}
                        <div className="col-xl-6">
                            <label className="form-label fw-bold text-dark fs-6">Last Name</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder="" name="last-name" autocomplete="off" />
                            <div className="fv-plugins-message-container invalid-feedback"></div>
                        </div>
                        {/*--end::Col--*/}
                        </div>
                        {/*--end::Input group--*/}
                        {/*--begin::Input group--*/}
                        <div className="fv-row mb-7 fv-plugins-icon-container">
                            <label className="form-label fw-bold text-dark fs-6">Email</label>
                            <input className="form-control form-control-lg form-control-solid" type="email" placeholder="" name="email" autocomplete="off" />
                            <div className="fv-plugins-message-container invalid-feedback"></div>
                        </div>
                        {/*--end::Input group--*/}
                        {/*--begin::Input group--*/}
                        {/*--end::Input group---*/}
                        {/*--begin::Input group--*/}
                        {/*--end::Input group--*/}
                        {/*--begin::Input group--*/}
                        <div className="fv-row mb-10 fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                            <label className="form-check form-check-custom form-check-solid form-check-inline">
                                <input className="form-check-input" type="checkbox" name="toc" value="1" />
                                <span className="form-check-label fw-semibold text-gray-700 fs-6">
                                    I Agree <div className="ms-1 link-primary">Terms and conditions</div>.
                                </span>
                            </label>
                            <div className="fv-plugins-message-container invalid-feedback">
                                <div data-field="toc" data-validator="notEmpty">You must accept the terms and conditions</div>
                            </div>
                        </div>
                        {/*--end::Input group--*/}
                        {/*--begin::Actions--*/}
                        <div className="text-center">
                            <button type="button" id="kt_sign_up_submit" className="btn btn-lg btn-primary">
                                <span className="indicator-label">
                                    Submit
                                </span>
                                <span className="indicator-progress">
                                    Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>    
                            </button>
                        </div>
                        {/*--end::Actions--*/}
                    </form>
                    {/*--end::Form--*/}
                </div>
                {/*--end::Wrapper--*/}
            </div>
            {/*--end::Content--*/}
            {/*--begin::Footer--*/}
            <div className="d-flex flex-center flex-column-auto p-10">
                {/*--begin::Links--*/}
                <div className="d-flex align-items-center fw-semibold fs-6">
                    <Link to={"/about"} className="text-muted text-hover-primary px-2">About</Link>
                    <Link to={"/support"} className="text-muted text-hover-primary px-2">Support</Link>
                    <Link to={"/pricing"} className="text-muted text-hover-primary px-2">Pricing</Link>
                </div>
                {/*--end::Links--*/}
            </div>
            {/*--end::Footer--*/}
        </div>

    </>);
};

export default DashboardAddUser;