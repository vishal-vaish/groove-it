import {useCurrentUser} from "../../lib/store.js";
import {useFetchFavouritePlaylist} from "../../lib/action/playlist.action.js";
import MediaSectionMinified from "../../components/sections/MediaSectionMinified.jsx";
import {Navigate} from "react-router-dom";

const FavouritePlaylists = () => {
  const {currentUser} = useCurrentUser();
  const {user, isLoaded} = currentUser || {};

  const {
    data: favouritePlaylists,
    isPending: isFavPlaylistDataPending,
    isSuccess: isFavPlaylistDataSuccess,
  } = useFetchFavouritePlaylist();

  return (
     <div className="favourite_playlists_page">
       {isLoaded && (
          <>
            {!user ? (
               <Navigate to="/" replace={true}/>
            ) : (
               <MediaSectionMinified
                  data={favouritePlaylists}
                  title="Favourite Playlists"
                  titleType="large"
                  subTitle="Curate your top playlists effortlessly with Favourite Playlists."
                  type="playlist"
                  gridNumber={3}
                  cardItemNumber={9}
                  isLoading={isFavPlaylistDataPending}
                  isSuccess={isFavPlaylistDataSuccess}
                  noDataText="No favourite playlist added!"
               />
            )}
          </>
       )}
     </div>
  );
};

export default FavouritePlaylists;