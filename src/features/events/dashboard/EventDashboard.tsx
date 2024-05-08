import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import { useAppDispatch, useAppSelector } from "../../../app/store/store"
import { db } from "../../../app/config/firebase"
import { collection, onSnapshot, query } from "firebase/firestore"
import { AppEvent } from "../../../app/types/event"
import { useEffect, useState } from "react"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { actions } from "../eventSlice"

export default function EventDashboard() {
  const { data: events } = useAppSelector(state => state.events)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "events"))
    const unsubscribe = onSnapshot(q, {
      next: querySnapshot => {
        const evts: AppEvent[] = []
        querySnapshot.forEach(doc => {
          evts.push({ ...doc.data(), id: doc.id } as AppEvent)
        })
        dispatch(actions.success(evts))
        setLoading(false)
      },
      error: err => {
        console.log(err)
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  if (loading) return <LoadingComponent />

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
