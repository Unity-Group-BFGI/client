import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, auth }  from '../../includes/Middlewares/Firebase.middleware';
import { auth_update } from "../../includes/Store/slice/Auth.slice";


const AuthProviderLayout = ({children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        
        // auth is loading
        dispatch(auth_update({
            IS_USER_LOGGED_IN: false,
            AUTH_LOADING: true,
            AUTH_LOADED: false,
            AUTH_USER: {},
            AUTH_TOKENS: {}
        }));
        

        onAuthStateChanged(auth, (user) => {
            if(user){ 
                // auth loaded
                // user logged in
                // auth user update
                dispatch(auth_update({
                    IS_USER_LOGGED_IN: true,
                    AUTH_LOADING: false,
                    AUTH_LOADED: true,
                    AUTH_USER: {
                        displayName: user.displayName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        photoURL: user.photoURL,
                    },
                    AUTH_TOKENS: {
                        accessToken: user.stsTokenManager.accessToken,
                        refreshToken: user.stsTokenManager.refreshToken,
                        expirationTime: user.stsTokenManager.expirationTime
                    }
                }));
                
                
            
            }else{     
                // auth loaded
                // user is not logged in
                // user update null  
                dispatch(auth_update({
                    IS_USER_LOGGED_IN: false,
                    AUTH_LOADING: false,
                    AUTH_LOADED: true,
                    AUTH_USER: {},
                    AUTH_TOKENS: {}
                }));
                
                        
            }
            
        });

    },[]);

    return (<>{children}</>);
};

export default AuthProviderLayout;