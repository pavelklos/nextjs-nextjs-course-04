// rfce
import { useRouter, withRouter } from "next/router";
import EventList from "../components/events/event-list";
// import { getFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";

function StartingPage(props) {
  const router = useRouter();
  const { query, pathname } = router;
  const { id } = query;
  // console.log("router", router);
  // console.log("query", query);

  // const featuredEvents = getFeaturedEvents();
  const featuredEvents = props.featuredEvents;
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

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800, // 1800 sec
  };
}
