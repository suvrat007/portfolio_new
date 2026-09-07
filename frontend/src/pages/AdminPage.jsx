import { usePageMeta } from "../hooks/usePageMeta";
import { useAuth } from "../hooks/useAuth";
import { AdminConsole } from "../shared/admin/AdminConsole";
import { LoginPanel } from "../shared/admin/LoginPanel";

const AdminPage = () => {
    usePageMeta({ title: "Admin", description: "Private editing console." });
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <AdminConsole /> : <LoginPanel />;
};

export default AdminPage;
