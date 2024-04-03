import React from 'react';
import Header from '../components/Header';
import Login from '../components/FormComponent/Login';
import jenkinsLogo from '../assets/Jenkins_logo.svg'; // Import the jenkinsLogo image

function LoginImage() {
    return (
        <div className="flex justify-center">
            <img
                src={jenkinsLogo}
                alt="Jenkins Logo"
                className="w-24 self-center"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center">
                <div className="flex justify-center flex-col">
                    <div>
                        <LoginImage />
                        <Header
                            heading="Login to your account"
                            paragraph="Don't have an account?"
                            linkName="Sign up"
                            linkUrl="#"
                        />
                    </div>
                    <div>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
}
