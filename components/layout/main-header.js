// rfce
import Link from "next/link";
import classes from "./main-header.module.css";
import { useRouter, withRouter } from "next/router";

function propsAsString(obj) {
  return Object.keys(obj)
    .map(function (k) {
      return k + ": " + obj[k];
    })
    .join(" AND ");
}

function MainHeader() {
  const router = useRouter();
  const { query, pathname } = router;
  // console.log("router", router);
  // console.log("pathname", pathname);
  // console.log("query", query);
  console.log({ pathname, query: propsAsString(query) });

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href='/'>NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href='/events'>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
