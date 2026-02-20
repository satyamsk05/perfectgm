import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
            <div className="mesh-gradient" style={{ willChange: 'transform, opacity' }} />
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
