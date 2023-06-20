import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth, signInWithPopup, googleAuthProvider } from "../../includes/Middlewares/Firebase.middleware";
import { useState } from 'react';

const CommonLayout = ({children}) => {
    const navigate = useNavigate();
    const {IS_USER_LOGGED_IN, AUTH_LOADED, AUTH_USER } = useSelector((state) => state.auth);
    const [user,setUser] = useState({});

    const signInWithGoogle = () => {
		signInWithPopup(auth, googleAuthProvider).then((result) => {
		}).catch((error) => {
			if(error.errorCode === "auth/operation-not-allowed") {
				
			}
		});
	};

    useEffect(() => {
        console.info("user is logged in:",IS_USER_LOGGED_IN);
        if(IS_USER_LOGGED_IN){
            setUser(AUTH_USER);
        }
    },[AUTH_LOADED]);

    return (<>
        <Helmet>
            <link rel="stylesheet" href="https://shuffle.dev/vendor/bootstrap-flaro/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://shuffle.dev/vendor/icons/css/fontello.css?v=2" />

        </Helmet>
        <section>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>
                        <img className="img-fluid" src={"/assets/svg/site-logo.svg"} alt="Logo" />
                    </Link>
                    <div className="collapse navbar-collapse position-absolute top-50 start-50 translate-middle">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/support">Support</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pricing">Pricing</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-none d-lg-block">
                        {
                            AUTH_LOADED? 
                            <>
                                {
                                    IS_USER_LOGGED_IN? 
                                    <button className="btn text-black btn-outline-light-dark" style={{padding: "10px 25px"}} onClick={() => navigate("/dashboard")}> 
                                        <img style={{width: "30px", marginRight: "10px", borderRadius: "20px"}} src={user && user.photoURL} alt={user && user.displayName} /> 
                                        {user && user.displayName}
                                    </button>  
                                : 
                                    <button className="btn text-black btn-outline-light-dark" onClick={signInWithGoogle}> 
                                        <img style={{width: '25px', marginRight: "10px"}} src={"/assets/svg/google-logo.svg"} alt="google logo" /> 
                                        Sign in
                                    </button>
                                }
                            </>
                            :
                            <>
                                <button className="btn text-black btn-outline-light-dark"> 
                                    Loading... 
                                </button>     
                            </>
                        }     
                    </div>
                </div>
            </nav>
        </section>

        <section className="py-12 py-sm-24 position-relative overflow-hidden">
            {children}
        </section>

        <section className="py-12 py-sm-24 position-relative overflow-hidden">
            <img className="position-absolute top-0 end-0" src={"/assets/svg/gradient2.svg"} alt="Background-gradient-footer" />
            <div className="container position-relative">
                <div className="row">
                    <div className="col-12 col-lg-3 mb-16 mb-lg-0">
                        <a className="d-inline-block mb-8" href="/">
                            <img src={"/assets/svg/site-logo.svg"} alt="site-logo-xl" />
                        </a>
                    </div>  
                    <div className="col-12 col-lg-9">
                        <div className="row">
                            <div className="col-6 col-md-3 mb-16 mb-md-0">
                                <h6 className="mb-6">Product</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/careers">Careers</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/about">About Us</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/Insights">Insights</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/pci">PCI Compliance</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/info-articles">Intro Articles</a></li>
                                    <li><a className="btn btn-link p-0 text-secondary" href="/pricing">Pricing</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-3 mb-16 mb-md-0">
                                <h6 className="mb-6">For Developers</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/docs">Docs</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/knowledge-base">Knowledge Base</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/system-status">System Status</a></li>
                                    <li><a className="btn btn-link p-0 text-secondary" href="/security">Security</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-3">
                                <h6 className="mb-6">Resources</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/about">About</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/leadership">Leadership</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/press">Press/News</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/team">Careers/Team</a></li>
                                    <li><a className="btn btn-link p-0 text-secondary" href="/contact">Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-3">
                                <h6 className="mb-6">Legal</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/docs">Docs</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/base">Knowledge Base</a></li>
                                    <li className="mb-4"><a className="btn btn-link p-0 text-secondary" href="/system-status">System Status</a></li>
                                    <li><a className="btn btn-link p-0 text-secondary" href="/security">Security</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>);
};

export default CommonLayout;