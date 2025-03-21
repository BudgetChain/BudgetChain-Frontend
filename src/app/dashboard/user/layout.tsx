import React from 'react';

interface UserLayoutProps {
    children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    return (
        <div className="user-layout flex ">
            <header className="user-layout__header w-[260px] h-screen">
                <h1>Dashboard</h1>
            </header>
            <main className="user-layout__content">
                {children}
            </main>
            
        </div>
    );
};

export default UserLayout;