import React from 'react';

import InternalHeader from './InternalHeader';
import InternalFooter from './InternalHeader';

const InternalPageLayout = (props) =>
    <>
        <InternalHeader />
        {props.children}
        <InternalFooter />
    </>

export default InternalPageLayout;
