// rfce
import { useRouter, withRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
// import { getAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/api-util";

function EventsPage(props) {
  const router = useRouter();
  const { query, pathname } = router;
  const { id } = query;
  // console.log("router", router);
  // console.log("query", query);

  // const events = getAllEvents();
  const events = props.events;
  function findEventsHandler(year, month) {
    // console.log("findEventsHandler()", year, month);
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <h2>All Events (show all Events)</h2>
      <h3>
        pathname: <span className='router'>{pathname}</span>
      </h3>
      <hr />
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;

export async function getStaticProps(context) {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
