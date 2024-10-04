import {classNames} from "../lib/utils.js";
import {useAppModal} from "../lib/store.js";
import IconButton from "./buttons/IconButton.jsx";

const Modal = () => {
  const {isOpen, close, modalContent} = useAppModal();

  return (
     <div
        className={classNames(
           "fixed overflow-auto bg-main h-full w-full left-sidebar z-[1300] nav_width slide_up duration-500",
           isOpen ? "top-0" : "top-[10000px]"
        )}
     >
       <div className="p-8">{modalContent ? modalContent : null}</div>
       <IconButton
          name="IoMdClose"
          className="absolute right-4 top-4 bg-primary"
          onClick={close}
       />
     </div>
  )
}

export default Modal;
