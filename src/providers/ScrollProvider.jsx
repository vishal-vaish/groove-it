import {useLocation} from "react-router-dom";
import {useNavScrollTrigger} from "../lib/store.js";
import {useEffect} from "react";

export default function ScrollProvider({children}) {
  const {pathname} = useLocation();
  const triggerPoint = 50;
  const {getIsNavScrollTrigger} = useNavScrollTrigger();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= triggerPoint) {
        getIsNavScrollTrigger(true);
      } else {
        getIsNavScrollTrigger(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [getIsNavScrollTrigger]);

  return children;
}
