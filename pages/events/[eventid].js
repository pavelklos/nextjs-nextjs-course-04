// rfce
import { useRouter, withRouter } from "next/router";
import { Fragment } from "react";
// import { getEventById } from "../../dummy-data";
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
  const router = useRouter();
  const { query, pathname } = router;
  const { eventid } = query;
  // console.log("router", router);
  // console.log("query", query);

  // const event = getEventById(eventid);
  const event = props.event;
  // console.log(event);

  if (!event) {
    return (
      // <ErrorAlert>
      //   <p>No event found!</p>
      // </ErrorAlert>
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>NextJS Events : {event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
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
        <Comments eventId={eventid} />
      </Fragment>
    </div>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventid = context.params.eventid;
  const event = await getEventById(eventid);
  return {
    props: {
      event: event,
    },
    revalidate: 30, // 30 sec
  };
}

export async function getStaticPaths() {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  return {
    // paths: [
    //   { params: { eventid: "e1" } },
    //   { params: { eventid: "e2" } },
    //   { params: { eventid: "e3" } },
    // ],
    paths: paths,
    // fallback: false,
    // fallback: true,
    fallback: "blocking",
  };
}
