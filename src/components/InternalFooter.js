import React from 'react';

const InternalFooter = () => (
    <footer className="site-footer no-print">
        {'Copyright © '}{(new Date().getFullYear())}{' Codenough'}
    </footer>
);

export default InternalFooter;