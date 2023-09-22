import DashboardNavBar from "@/dashboard/components/navbar"
import DashboardFooter from "@/dashboard/components/footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-full">
      <DashboardNavBar />
      <div className="flex flex-col flex-grow w-full">
        {children}
      </div>
      <DashboardFooter />
    </div>
  )
}
