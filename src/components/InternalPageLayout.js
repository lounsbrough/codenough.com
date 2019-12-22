import React from 'react';

import InternalHeader from './InternalHeader';
import InternalFooter from './InternalFooter';

const InternalPageLayout = (props) =>
    <>
        <InternalHeader />
        {props.children}
        <InternalFooter />
    </>

export default InternalPageLayout;
