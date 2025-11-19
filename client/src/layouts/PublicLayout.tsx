import type { ReactNode, FC } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[var(--secondary)] text-[var(--text)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
