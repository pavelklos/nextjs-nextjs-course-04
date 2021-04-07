// rfce
import { useRouter, withRouter } from "next/router";
// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import useSWR from "swr";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const { query, pathname } = router;
  const { slug } = query;
  // console.log("router", router);
  // console.log("query", query);

  const filterData = router.query.slug;
  // console.log(filterData);

  // SWR : GET ALL EVENTS ******************************************************
  const { data, error } = useSWR(
    "https://nextjs-course-ec66f-default-rtdb.firebaseio.com/events.json"
  );
  useEffect(() => {
    if (data) {
      const events = []; // JS Object -> JS Array
      for (const key in data) {
        events.push({
          id: key,
          ...data[key], // JS spread operator
        });
      }
      setLoadedEvents(events);
    }
  }, [data]); // ON INITIAL RENDER + DEPENDENCY 'data'
  // SWR : GET ALL EVENTS ******************************************************

  // if (!filterData) {
  //   return <p className='center'>Loading...</p>;
  // }
  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    // props.hasError
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2031 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button href='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });
  // const filteredEvents = props.filteredEvents;
  // console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button href='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  // const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <h2>Filtered Events (show filtered Events)</h2>
      <h3>
        pathname: <span className='router'>{pathname}</span>
      </h3>
      {query?.slug?.map((item, index) => {
        return (
          <h3 key={index}>
            query.slug[{index}]: <span className='router'>{item}</span>
          </h3>
        );
      })}
      <hr />
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2031 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
