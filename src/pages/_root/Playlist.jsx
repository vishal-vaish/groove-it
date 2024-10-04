import {Navigate, useParams} from "react-router-dom";
import {useFetchPlaylists} from "../../lib/action/editorial.action.js";
import BannerSection from "../../components/sections/BannerSection.jsx";
import TrackSection from "../../components/sections/TrackSection.jsx";

const allowedSection = ["playlist", "album", "radio"];

const Playlist = () => {
  const slug = useParams();
  const {section = "playlist", id} = slug || {};

  const {
    data: playlists,
    isPending: playlistDataPending,
    isSuccess: playlistDataSuccess,
  } = useFetchPlaylists({id, section});

  const {tracks} = playlists || {};

  if (!section || !id || !allowedSection.includes(section)) {
    return <Navigate to="/discover" replace/>;
  }

  return (
     <section className="playlist_section">
       <BannerSection
          details={playlists}
          tracks={tracks?.data}
          isLoading={playlistDataPending}
          isSuccess={playlistDataSuccess}
          showPattern
       />

       <div className="relative mt-8">
         <TrackSection
            data={tracks?.data && tracks?.data}
            details={{
              id: playlists?.id,
              type: playlists?.type,
            }}
            disableRowList={["dateCreated"]}
            skeletonItemNumber={20}
            isLoading={playlistDataPending}
            isSuccess={playlistDataSuccess}
         />
       </div>
     </section>
  );
}

export default Playlist;