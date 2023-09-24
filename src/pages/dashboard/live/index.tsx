import { LiveMap } from "./live-map"
import { getDashboardLayout } from "@/pages/dashboard/layout"

function Live() {
  return (
    <LiveMap />
  )
}

Live.getLayout = getDashboardLayout

export default Live
