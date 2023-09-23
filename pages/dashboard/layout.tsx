import type { ReactElement } from 'react'
import DashboardLayout from "@/pages/dashboard/components/layout"

export function getDashboardLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}
