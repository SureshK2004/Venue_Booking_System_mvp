"use client"

import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { Button } from "@/components/ui/button"

interface AvailabilityCalendarProps {
  availableDates: Date[]
  onSelectDate: (date: Date) => void
}

export default function AvailabilityCalendar({
  availableDates,
  onSelectDate,
}: AvailabilityCalendarProps) {
  const [selected, setSelected] = useState<Date | undefined>()

  const isAvailable = (day: Date) =>
    availableDates.some(
      (d) => d.toDateString() === day.toDateString()
    )

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg w-full md:w-[400px]">
      <h2 className="text-lg font-semibold mb-3">Select Availability</h2>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={{ available: availableDates }}
        modifiersStyles={{
          available: { backgroundColor: "#4ade80", color: "white" },
        }}
        disabled={(day) => !isAvailable(day)}
      />
      <div className="mt-4">
        <Button
          className="w-full"
          disabled={!selected}
          onClick={() => selected && onSelectDate(selected)}
        >
          Book for {selected?.toDateString() || ""}
        </Button>
      </div>
    </div>
  )
}