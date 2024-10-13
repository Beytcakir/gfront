import React from 'react';
import './page-header.scss';
import LogoutButton from './form-fields/logout-button';
import dynamic from 'next/dynamic';

// Dynamically import the BackButton component, disabling SSR
const BackButton = dynamic(
    () => import('@/components/common/form-fields/back-button'),
    {
        ssr: false
    }
);

const PageHeader = ({ children }) => {
    return (
        <div className="page-header-container">
            <div>
                <BackButton />
            </div>
            <h1 className="page-header">{children}</h1>
            <div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default PageHeader;
