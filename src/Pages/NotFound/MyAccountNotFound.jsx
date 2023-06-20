import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const MyAccountNotFound = () => {
    return (<>
        <Helmet>
            <title>404 | Page not found</title>
        </Helmet>

        <section className=" col-sm-12 col-md-6 m-auto py-12 py-sm-24 py-md-32 overflow-hidden">
            <div className="container position-relative">
                <img className="position-absolute top-50 start-50 translate-middle" src={"/assets/svg/gradient3.svg"} alt="background-gradient3" />
                <div className="position-relative mw-lg mx-auto px-8 px-md-20 pt-10 pb-14 bg-white text-center rounded-4 shadow-lg">
                    <img className="d-block mx-auto img-fluid" src={"/assets/img/404.png"} alt="404-not-found" />
                    <p className="mt-n8 mb-32 fw-semibold text-secondary-light text-uppercase">The page you are looking for is not found</p>
                    <h4 className="fs-5 mb-4">Try another page</h4>
                    <p className="text-secondary-dark mb-8">Lorem ipsum dolor sit amet consectrtur. Volutpat tempor condimentum vitae vel pur.</p>
                    <Link className="btn p-0 btn-link fw-light d-inline-flex align-items-center" to={"/dashboard/my-account/overview"}>
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.66667 10.6667L1 6.00004M1 6.00004L5.66667 1.33337M1 6.00004L13 6.00004" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span className="ms-2">Go Back to My Account</span>
                    </Link>
                </div>
            </div>
        </section>
    </>)
};

export default MyAccountNotFound;