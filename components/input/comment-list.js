import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((item) => {
        return (
          <li key={item._id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address> | <b>{item.email}</b>
              <p>
                _id: [{item._id}], eventId: [{item.eventId}]
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;

// <ul className={classes.comments}>
//   {/* Render list of comments - fetched from API */}
//   <li>
//     <p>My comment is amazing!</p>
//     <div>
//       By <address>Maximilian</address>
//     </div>
//   </li>
//   <li>
//     <p>My comment is amazing!</p>
//     <div>
//       By <address>Maximilian</address>
//     </div>
//   </li>
// </ul>;
