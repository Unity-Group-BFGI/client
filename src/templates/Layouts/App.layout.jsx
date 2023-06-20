import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthProviderLayout from "./AuthProvider.layout";
import { width as setWidth, y as setOffsetY } from "../../includes/Store/slice/Theme.slice";

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const useScrollOffset = () => {
    const [offset,setOffset] = useState([0,0]);
    useLayoutEffect(() => {
        function updateOffset(){
            setOffset([window.pageXOffset,window.pageYOffset]);
        }
        window.addEventListener('scroll',updateOffset);
        updateOffset();
        return () => window.removeEventListener('scroll',updateOffset);
    },[]);
    return offset;
};

const AppLayout = ({children}) => {
    const dispatch  = useDispatch();
    const [width]   = useWindowSize();
    const [x,y]     = useScrollOffset();

    useEffect(() => {
        dispatch(setWidth(width));
    },[width]);

    useEffect(() => {
        dispatch(setOffsetY(y));
    },[y]);

    return (<>
        <AuthProviderLayout>
            {children}
        </AuthProviderLayout>
    </>);
};

export default AppLayout;