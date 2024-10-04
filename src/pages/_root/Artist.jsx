import {useParams} from "react-router-dom";
import {useFetchArtist} from "../../lib/action/editorial.action.js";
import {useState} from "react";
import Playlists from "../../components/tab-contents/Playlists.jsx";
import TopTracks from "../../components/tab-contents/TopTracks.jsx";
import RelatedArtists from "../../components/tab-contents/RelatedArtists.jsx";
import Albums from "../../components/tab-contents/Albums.jsx";
import BannerSection from "../../components/sections/BannerSection.jsx";
import AppTab from "../../components/Tab.jsx";
import Discography from "../../components/tab-contents/Discography.jsx";

const Artist = () => {
  const {id} = useParams();
  const {
    data: artist,
    isPending: artistDataPending,
    isSuccess: artistDataSuccess,
  } = useFetchArtist({id});

  const {details, topTracks, albums, playlists, relatedArtists} =
  artist || {};

  const [currentTab, setCurrentTab] = useState("discography");

  const content = {
    discography: (
       <Discography
          setCurrentTab={setCurrentTab}
          data={artist}
          isPending={artistDataPending}
          isSuccess={artistDataSuccess}
       />
    ),
    playlists: (
       <Playlists
          playlists={playlists}
          isPending={artistDataPending}
          isSuccess={artistDataSuccess}
       />
    ),
    top_tracks: (
       <TopTracks
          topTracks={topTracks}
          isPending={artistDataPending}
          isSuccess={artistDataSuccess}
       />
    ),
    related_artists: (
       <RelatedArtists
          relatedArtists={relatedArtists}
          isPending={artistDataPending}
          isSuccess={artistDataSuccess}
       />
    ),
    albums: (
       <Albums
          albums={albums}
          isPending={artistDataPending}
          isSuccess={artistDataSuccess}
       />
    ),
  };

  return (
     <section className="relative artist_section">
       <BannerSection
          details={details}
          tracks={topTracks?.data}
          type="artist"
          isLoading={artistDataPending}
          isSuccess={artistDataSuccess}
       />
       <div>
         <AppTab
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            content={content}
            tabs={[
              {
                id: "discography",
                name: "Discography",
                display: true,
              },
              {
                id: "top_tracks",
                name: "Top Tracks",
                display: topTracks?.data?.length,
              },
              {
                id: "playlists",
                name: "Playlists",
                display: playlists?.data?.length,
              },
              {
                id: "related_artists",
                name: "Related Artists",
                display: relatedArtists?.data?.length,
              },
              {
                id: "albums",
                name: "Albums",
                display: albums?.data?.length,
              },
            ]}
            isLoaded={Boolean(artist)}
         />
       </div>
     </section>
  )
}

export default Artist;