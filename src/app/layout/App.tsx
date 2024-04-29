import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import NavBar from "./nav/NavBar"
import { useState } from "react"

function App() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      {/* pass down the setFormOpen function to the NavBar component as a prop */}
      <NavBar setFormOpen={setFormOpen} />
      <Container className="main">
        {/* pass down the formOpen state and setFormOpen function to the EventDashboard component as props */}
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </>
  )
}

export default App
