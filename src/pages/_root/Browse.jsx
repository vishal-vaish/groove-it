import {useEffect, useState} from "react";
import {useAppUtil} from "../../lib/store.js";
import {useFetchGenres} from "../../lib/action/editorial.action.js";
import Overlay from "../../components/Overlay.jsx";
import {classNames} from "../../lib/utils.js";
import Genre from "./Genre.jsx";

const Browse = () => {
  const [getGenre, setGetGenre] = useState();
  const {getToggleGenres, toggleGenres} = useAppUtil();
  const {data: genres} = useFetchGenres();

  useEffect(() => {
    if (genres) setGetGenre(genres?.[0]?.id);
  }, [genres]);

  return (
     <div className="browse_page">
       <div className="relative gap-6">
         <Overlay
            isOpen={toggleGenres}
            handleIsOpen={getToggleGenres}
            transparent
            className="z-[800]"
         />
         {getGenre && (
            <div className="mb-6 genre_dropdown">
              <button
                 className="gap-2 p-3 text-sm font-semibold border rounded border-primary text-primary flex_justify_between"
                 onClick={() => getToggleGenres(true)}
              >
                Select Genre
              </button>
            </div>
         )}

         <div
            className={classNames(
               "fixed h-screen z-[900] pt-main-top top-0 w-[200px] transition-all duration-500",
               toggleGenres ? "left-sidebarHorizontal" : "left-[-500px]"
            )}
         >
           <ul
              className={classNames(
                 "list-none text-onNeutralBg text-sm bg-main overflow-auto w-full hide_scrollbar duration-500 transition-all shadow-box h-full"
              )}
           >
             {genres &&
                genres?.map((genre) => (
                   <li
                      key={genre.id}
                      className={classNames(
                         "border-b border-main hover:text-primary",
                         getGenre === genre?.id && "text-primary"
                      )}
                   >
                     <button
                        className="w-full h-full p-4 font-semibold text-left"
                        onClick={() => {
                          setGetGenre(genre.id);
                          getToggleGenres(false);
                        }}
                     >
                       {genre?.name}
                     </button>
                   </li>
                ))}
           </ul>
         </div>

         <Genre id={getGenre}/>
       </div>
     </div>
  );
};

export default Browse;