import { LiveMap } from "./live-map"
import { getDashboardLayout } from "@/pages/dashboard/layout"

export default function Live() {
  return (
    <LiveMap />
  )
}

Live.getLayout = getDashboardLayout
