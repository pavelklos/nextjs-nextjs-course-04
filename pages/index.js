// rfce
import { useRouter, withRouter } from "next/router";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

function StartingPage() {
  const router = useRouter();
  const { query, pathname } = router;
  const { id } = query;
  // console.log("router", router);
  // console.log("query", query);

  const featuredEvents = getFeaturedEvents();
  // console.log(featuredEvents);

  return (
    <div>
      <h2>Home Page (show featured Events)</h2>
      <h3>
        pathname: <span className='router'>{pathname}</span>
      </h3>
      <hr />
      <EventList items={featuredEvents} />
    </div>
  );
}

export default StartingPage;
