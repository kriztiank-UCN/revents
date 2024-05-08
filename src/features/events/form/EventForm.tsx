import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, Header, Segment } from "semantic-ui-react"
import { useAppSelector } from "../../../app/store/store"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { categoryOptions } from "./categoryOptions"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { AppEvent } from "../../../app/types/event"
import { toast } from 'react-toastify';
import { collection, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { db } from "../../../app/config/firebase"

export default function EventForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
  })
  const { id } = useParams()
  const event = useAppSelector(state => state.events.events.find(e => e.id === id))
  const navigate = useNavigate()

  async function updateEvent(data: AppEvent) {
    if (!event) return;
const docRef = doc(db, "events", event.id);

    await updateDoc(docRef, {
        ...data,
        date: Timestamp.fromDate(data.date as unknown as Date)
    })
}

async function createEvent(data: FieldValues) {
  const newEventRef = doc(collection(db, 'events'));
  await setDoc(newEventRef, {
      ...data,
      hostedBy: 'bob', 
      attendees: [], 
      hostPhotoURL: '',
      date: Timestamp.fromDate(data.date as unknown as Date)
  })
  return newEventRef;
} 

async function onSubmit(data: FieldValues) {
  try {
      if (event) {
          await updateEvent({...event, ...data});
          navigate(`/events/${event.id}`);
      } else {
          const ref = await createEvent(data);
          navigate(`/events/${ref?.id}`)
      }
  } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
  }
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
        {/* description */}
        <Form.TextArea
          placeholder="Description"
          defaultValue={event?.description || ""}
          {...register("description", { required: "Description is required" })}
          error={errors.description && errors.description.message}
        />
        <Header sub content="Location details" color="teal" />
        {/* city */}
        <Form.Input
          placeholder="City"
          defaultValue={event?.city || ""}
          {...register("city", { required: "City is required" })}
          error={errors.city && errors.city.message}
        />
        {/* venue */}
        <Form.Input
          placeholder="Venue"
          defaultValue={event?.venue || ""}
          {...register("venue", { required: "Venue is required" })}
          error={errors.venue && errors.venue.message}
        />
        {/* date */}
        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={value => setValue("date", value, { shouldValidate: true })}
                showTimeSelect
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="Event date and time"
              />
            )}
          />
        </Form.Field>
        {/* buttons */}
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
