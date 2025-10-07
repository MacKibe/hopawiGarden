import type { ReactNode, FC } from 'react';
import Header from '../components/common/Header';


interface PlainLayoutProps {
  children: ReactNode;
}

const PlainLayout: FC<PlainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
        <Header />
        <main className="min-h-screen bg-[var(--primary)] text-[var(--text)]">
        {children}
        </main>
    </div>
  );
};

export default PlainLayout;
