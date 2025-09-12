import AdminHeader from "@/components/AdminHeader";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-background w-full">{children}</main>
    </>
  );
}
