import { usePageMeta } from "../hooks/usePageMeta";
import { useAuth } from "../hooks/useAuth";
import { AdminConsole } from "../features/admin/AdminConsole";
import { LoginPanel } from "../features/admin/LoginPanel";

const AdminPage = () => {
    usePageMeta({ title: "Admin", description: "Private editing console." });
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <AdminConsole /> : <LoginPanel />;
};

export default AdminPage;
