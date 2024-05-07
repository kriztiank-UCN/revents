import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import { useAppDispatch, useAppSelector } from "../../../app/store/store"
import { db } from "../../../app/config/firebase"
import { collection, onSnapshot, query } from "firebase/firestore"
import { AppEvent } from "../../../app/types/event"
import { useEffect } from "react"
import { setEvents } from "../eventSlice"

export default function EventDashboard() {
  const { events } = useAppSelector(state => state.events)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const q = query(collection(db, "events"))
    const unsubscribe = onSnapshot(q, {
      next: querySnapshot => {
        const evts: AppEvent[] = []
        querySnapshot.forEach(doc => {
          evts.push({ ...doc.data(), id: doc.id } as AppEvent)
        })
        dispatch(setEvents(evts))
      },
      error: error => {
        console.error("Error getting documents: ", error)
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  )
}
