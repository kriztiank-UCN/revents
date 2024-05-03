import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../../app/store/store"
import { createEvent, updateEvent } from "../eventSlice"
import { createId } from "@paralleldrive/cuid2"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { categoryOptions } from "./categoryOptions"
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from "react-datepicker"

export default function EventForm() {
  const {
    register, handleSubmit, control, setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
  })
  let { id } = useParams()
  const event = useAppSelector(state => state.events.events.find(e => e.id === id))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function onSubmit(data: FieldValues) {
    console.log(data)
    // id = id ?? createId()
    // event
    //   ? dispatch(updateEvent({ ...event, ...values }))
    //   : dispatch(createEvent({ ...values, id, hostedBy: "bob", attendees: [], hostPhotoURL: "" }))
    // navigate(`/events/${id}`)
  }

  return (
    <Segment clearing>
      <Header content="Event details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <Form.Input
          placeholder="Event title"
          defaultValue={event?.title || ""}
          {...register("title", { required: true })}
          error={errors.title && "Title is required"}
        />

        {/* category */}
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          defaultValue={event?.category}
          render={({ field }) => (
            <Form.Select
              options={categoryOptions}
              placeholder="Category"
              clearable
              {...field}
              onChange={(_, d) => setValue("category", d.value, { shouldValidate: true })}
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.TextArea
          placeholder="Description"
          defaultValue={event?.description || ""}
          {...register("description", { required: "Description is required" })}
          error={errors.description && errors.description.message}
        />
        <Header sub content="Location details" color="teal" />
        <Form.Input
          placeholder="City"
          defaultValue={event?.city || ""}
          {...register("city", { required: "City is required" })}
          error={errors.city && errors.city.message}
        />

        <Form.Input
          placeholder="Venue"
          defaultValue={event?.venue || ""}
          {...register("venue", { required: "Venue is required" })}
          error={errors.venue && errors.venue.message}
        />

        <Form.Input
          type="date"
          placeholder="Date"
          defaultValue={event?.date || ""}
          {...register("date", { required: "Date is required" })}
          error={errors.date && errors.date.message}
        />

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          floated="right"
          positive
          content="Submit"
        />
        <Button
          loading={isSubmitting}
          as={Link}
          to="/events"
          type="button"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  )
}
