import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata = {
  title: "Admin | IDEATYS Digital",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-100">
        {session ? (
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8">{children}</main>
          </div>
        ) : (
          children
        )}
      </div>
    </SessionProvider>
  );
}
