import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface DashboardCardProps {
  title: string
  count: number
  icon: React.ReactElement<LucideIcon>
}

const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-neutral-100 dark:bg-neutral-800 p-4 pb-0">
      <CardContent>
        <h3 className="text-3xl text-center mb-4 font-bold text-neutral-500 dark:text-neutral-200">
          {title}
        </h3>
        <div className="flex gap-5 justify-center items-center">
          {icon}
          <h3 className="text-5xl font-semibold text-neutral-500 dark:text-neutral-200">
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardCard
