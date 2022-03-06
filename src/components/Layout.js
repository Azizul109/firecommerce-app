import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';

const Layout = (props) => {
    return (
        <div>

            {props.loading && (<Loader/>)}

            <Header></Header>
            <div className="content">
                {props.children}
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Layout;