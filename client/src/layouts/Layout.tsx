import type { ReactNode, FC } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Layout: FC<{ children: ReactNode }> = ({children}) => {
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-16 py-6 bg-[var(--background)] text-[var(--text)]">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;