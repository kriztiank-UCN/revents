import { NavLink } from "react-router-dom"
import { Button, Container, Menu, MenuItem } from "semantic-ui-react"
import SignedOutButtons from "./SignedOutButtons"
import SignedInMenu from "./SignedInMenu"
import { useState } from "react";

export default function NavBar() {
  const [auth, setAuth] = useState(false);

  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header as={NavLink} to='/'>
          <img src="/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Re-vents
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to='/events' />
        <MenuItem name="Scratch" as={NavLink} to='/scratch' />
        <MenuItem>
          <Button 
          as={NavLink} 
          to='/createEvent'
          floated="right" 
          positive 
          inverted 
          content="Create Event" />
        </MenuItem>
        {auth ? <SignedInMenu setAuth={setAuth} /> : <SignedOutButtons setAuth={setAuth} />}
      </Container>
    </Menu>
  )
}
