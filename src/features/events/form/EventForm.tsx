import { ChangeEvent, useState } from "react"
import { Button, Form, Header, Segment } from "semantic-ui-react"

export default function EventForm() {
  // if we have a selected event, we'll use that as the initial values
  const initialValues = {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  }

  const [values, setValues] = useState(initialValues)

  function onSubmit() {
    console.log(values);
    // selectedEvent
    //   ? updateEvent({ ...selectedEvent, ...values })
    //   : addEvent({ ...values, id: createId(), hostedBy: "bob", attendees: [], hostPhotoURL: "" })
    // setFormOpen(false)
  }

  // we'll use the name and value to update our state
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    // get the name and value from the input fields
    const { name, value } = e.target
    // update the state with the new value
    setValues({ ...values, [name]: value })
  }

  return (
    <Segment clearing>
      <Header content={'Create Event'} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event title"
            value={values.title}
            name="title"
            onChange={e => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            value={values.category}
            name="category"
            onChange={e => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            value={values.description}
            name="description"
            onChange={e => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="City"
            value={values.city}
            name="city"
            onChange={e => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            value={values.venue}
            name="venue"
            onChange={e => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            value={values.date}
            name="date"
            onChange={e => handleInputChange(e)}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button type="submit" floated="right" content="Cancel" />
      </Form>
    </Segment>
  )
}
