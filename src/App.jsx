import './App.css';
import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Menu from './pages/Menu';

function App() {
    return (
        <div className="root">
            <div className="content">
                <div>
                    {/* <div {className="h-screen flex flex-col"}> */}
                    <div>
                        {/* <div className="flex-grow flex items-center justify-center"> */}
                        <Routers>
                            <Routes>
                                <Route path="/" element={<LoginPage />} />
                                <Route path="/home" element={<Menu />} />
                            </Routes>
                        </Routers>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center py-4">
            <p className="mb-2">© 2024 SOA Restaurant</p>
            <div className="flex justify-center space-x-4">
                <a href="#" className="hover:text-blue-500">
                    About Us
                </a>
                <a href="#" className="hover:text-blue-500">
                    Privacy Policy
                </a>
                <a href="#" className="hover:text-blue-500">
                    Terms & Conditions
                </a>
            </div>
        </footer>
    );
};

export default App;
