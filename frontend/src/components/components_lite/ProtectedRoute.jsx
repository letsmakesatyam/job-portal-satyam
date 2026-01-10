import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [isLoading, user, navigate]);

    if (isLoading) {
        return (
            <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-black">
                {/* Animated Background Gradients */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900 blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900 blur-[120px] animate-pulse delay-700"></div>
                </div>

                {/* Loader Content */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                        {/* Outer glowing ring */}
                        <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-20 animate-ping"></div>
                        <Loader2 className="h-12 w-12 animate-spin text-blue-400 relative z-10" />
                    </div>
                    
                    <span className="mt-4 text-gray-300 text-lg font-medium tracking-widest animate-pulse">
                        VERIFYING SESSION
                    </span>
                </div>
            </div>
        );
    }

    return user ? <>{children}</> : null;
};

export default ProtectedRoute;