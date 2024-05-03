import {useCurrentUser} from "../../lib/store.js";
import {useFetchFavouritePlaylist} from "../../lib/actions/playlist.action.js";
import {Navigate} from "react-router-dom";
import MediaSectionMinified from "../../components/sections/MediaSectionMinified.jsx";

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
