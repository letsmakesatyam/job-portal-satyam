import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"; // npm install lucide-react

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
            <div className="flex items-center justify-center h-screen w-full">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                <span className="ml-2 text-lg font-medium">Verifying session...</span>
            </div>
        );
    }

    return user ? <>{children}</> : null;
};

export default ProtectedRoute;