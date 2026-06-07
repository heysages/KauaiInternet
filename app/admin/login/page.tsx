import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ocean-deep flex items-center justify-center text-mist text-sm">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
