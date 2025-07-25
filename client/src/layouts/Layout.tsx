import type { ReactNode, FC } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Layout: FC<{ children: ReactNode }> = ({children}) => {
    return(
        <div className="flex flex-col">
            <Header />
            <main className="bg-[var(--primary)] text-[var(--text)]">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;