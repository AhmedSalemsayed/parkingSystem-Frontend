import AdminHeader from "@/components/AdminHeader";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-background">
      <AdminHeader />
      {children}
    </main>
  );
}
