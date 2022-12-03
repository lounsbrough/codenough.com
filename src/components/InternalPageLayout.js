import React from 'react';

import InternalHeader from './InternalHeader';
import InternalFooter from './InternalFooter';

const InternalPageLayout = (props) =>
    <>
        <InternalHeader showNavigation={props.showNavigation} />
        <h2 className="page-title no-print">{props.pageTitle}</h2>
        <div className="layout-container-main">
            {props.children}
        </div>
        <InternalFooter />
    </>

export default InternalPageLayout;
