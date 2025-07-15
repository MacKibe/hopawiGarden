import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Layout = ({children}) => {
    return(
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;