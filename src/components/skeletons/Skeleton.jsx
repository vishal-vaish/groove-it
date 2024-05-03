import {classNames} from "../../lib/utils.js";

function Skeleton({ className, ...props }) {
  return <div className={classNames("animate-pulse", className)} {...props} />;
}

export { Skeleton };
