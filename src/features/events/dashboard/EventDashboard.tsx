import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import EventForm from "../form/EventForm"
import { useEffect, useState } from "react"
import { AppEvent } from "../../../app/types/event"
import { sampleData } from "../../../app/api/sampleData"

type Props = {
  formOpen: boolean
  setFormOpen: (value: boolean) => void
}

export default function EventDashboard({ formOpen, setFormOpen }: Props) {
  const [events, setEvents] = useState<AppEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null)

  // empty dependency array means this effect will only run once
  useEffect(() => {
    setEvents(sampleData)
  }, [])

  function addEvent(event: AppEvent) {
    setEvents(prevState => {
      return [...prevState, event]
    })
  }

  function handleSelectEvent(event: AppEvent) {
    setSelectedEvent(event)
    setFormOpen(true)
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={handleSelectEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && 
        <EventForm 
        setFormOpen={setFormOpen} 
        addEvent={addEvent} 
        selectedEvent={selectedEvent} />}
      </Grid.Column>
    </Grid>
  )
}
