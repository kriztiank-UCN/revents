import { NavLink } from "react-router-dom"
import { Button, Container, Menu, MenuItem } from "semantic-ui-react"

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header as={NavLink} to='/'>
          <img src="/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-vents
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to='/events' />
        <MenuItem>
          <Button 
          as={NavLink} 
          to='/createEvent'
          floated="right" 
          positive 
          inverted 
          content="Create Event" />
        </MenuItem>
        <MenuItem position="right">
          <Button basic inverted content="Login" />
          <Button basic inverted content="Register" style={{ marginLeft: "0.5em" }} />
        </MenuItem>
      </Container>
    </Menu>
  )
}
