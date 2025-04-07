import * as React from "react"
import CalendarLib from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function Calendar({
  className,
  value,
  onChange,
  ...props
}) {
  const [currentDate, setCurrentDate] = React.useState(value || new Date())

  return (
    <div className={cn("p-3 rounded-md", className)}>
      <CalendarLib
        onChange={(date) => {
          setCurrentDate(date)
          onChange?.(date)
        }}
        value={currentDate}
        prevLabel={<ChevronLeft className="size-4 opacity-60 hover:opacity-100" />}
        nextLabel={<ChevronRight className="size-4 opacity-60 hover:opacity-100" />}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={true}
        tileClassName={({ date, view }) => {
          const base = "text-sm text-center p-2 rounded-md transition hover:bg-accent"
          if (view === 'month') {
            if (date.toDateString() === new Date().toDateString()) {
              return cn(base, "bg-accent text-accent-foreground")
            }
            return base
          }
          return ""
        }}
        {...props}
      />
    </div>
  )
}

export { Calendar }
