import { createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import EventDetailedPage from "../../features/events/details/EventDetailedPage"
import EventForm from "../../features/events/form/EventForm"
import Scratch from "../../features/scratch/Scratch"
import AccountPage from "../../features/auth/AccountPage"
import ProfilePage from '../../features/profiles/ProfilePage';
// import RequireAuth from './RequireAuth';
// import UnauthComponent from '../layout/UnauthComponent';
// import MapsWrapper from '../common/maps/MapsWrapper';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/events", element: <EventDashboard /> },
      { path: "/events/:id", element: <EventDetailedPage /> },
      { path: "/manage/:id", element: <EventForm /> },
      // EventForm with a key makes it unique and will rerender the component
      { path: "/createEvent", element: <EventForm key="create" /> },
      {path: '/profiles/:id', element: <ProfilePage />},
      { path: "/account", element: <AccountPage /> },
      { path: "/scratch", element: <Scratch /> },
    ],
  },
])
