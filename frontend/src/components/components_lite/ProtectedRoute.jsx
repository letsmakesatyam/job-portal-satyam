import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading, navigate]);

    if (isLoading) return <div>Loading...</div>; // Or a spinner
    return <>{user ? children : null}</>;
};
export default ProtectedRoute