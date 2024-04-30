import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { useState } from "react"
import { AppEvent } from "../types/event"
import { Outlet } from "react-router-dom"

function App() {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null)

  function handleSelectEvent(event: AppEvent | null) {
    setSelectedEvent(event)
    setFormOpen(true)
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null)
    setFormOpen(true)
  }

  return (
    <>
      {/* pass down the setFormOpen function to the NavBar component as a prop */}
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <Outlet />
      </Container>
    </>
  )
}

export default App
