// rfce
import { useRouter, withRouter } from "next/router";
import { Fragment } from "react";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage() {
  const router = useRouter();
  const { query, pathname } = router;
  const { eventid } = query;
  // console.log("router", router);
  // console.log("query", query);

  const event = getEventById(eventid);
  // console.log(event);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <div>
      <h2>Event Detail (show selected Event)</h2>
      <h3>
        pathname: <span className='router'>{pathname}</span>
      </h3>
      <h3>
        id: <span className='router'>{eventid}</span>
      </h3>
      <hr />
      <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    </div>
  );
}

export default EventDetailPage;
