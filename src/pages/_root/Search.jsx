import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useFetchSearch} from "../../lib/actions/editorial.action.js";
import Title from "../../components/headers/Title.jsx";
import AllSearch from "../../components/tab-contents/AllSearch.jsx";
import AppTab from "../../components/Tab.jsx";
import Playlists from "../../components/tab-contents/Playlists.jsx";
import TopTracks from "../../components/tab-contents/TopTracks.jsx";
import RelatedArtists from "../../components/tab-contents/RelatedArtists.jsx";
import Albums from "../../components/tab-contents/Albums.jsx";

const Search = () => {
  const [getQuery, setGetQuery] = useState(null);
  const [currentTab, setCurrentTab] = useState("all");

  const params = useParams();

  useEffect(() => {
    const query = new URL(window.location.href).searchParams.get("q");
    if (query) {
      setGetQuery(query);
    }
  }, [params]);

  const {
    isPending: searchDataPending,
    isSuccess: searchDataSuccess,
    data: searchResult,
  } = useFetchSearch({searchText: getQuery});

  const {tracks, albums, playlists, artists} = searchResult || {};

  const content = {
    all: (
      <AllSearch
        setCurrentTab={setCurrentTab}
        data={searchResult}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    playlists: (
      <Playlists
        playlists={playlists}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    tracks: (
      <TopTracks
        topTracks={tracks}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    artists: (
      <RelatedArtists
        relatedArtists={artists}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    albums: (
      <Albums
        albums={albums}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
  };

  return (
    <section className="search_page relative">
      {!searchDataPending ? (
        <>
          {searchDataSuccess && tracks?.data?.length ? (
            <AppTab
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              content={content}
              tabs={[
                {id: "all", name: "All", display: true},
                {id: "tracks", name: "Tracks", display: tracks?.data?.length},
                {
                  id: "playlists",
                  name: "Playlists",
                  display: playlists?.data?.length,
                },
                {
                  id: "artists",
                  name: "Artists",
                  display: artists?.data?.length,
                },
                {id: "albums", name: "Albums", display: albums?.data?.length},
              ]}
              isLoaded={Boolean(searchResult)}
            />
          ) : (
            <div className="rounded p-4 bg-card shadow-lg w-fit">
              <Title name="No result found!" type="small" divider={false}/>
            </div>
          )}
        </>
      ) : (
        <div className="rounded p-4 bg-card shadow-lg w-fit">
          <Title name="Searching ..." type="small" divider={false}/>
        </div>
      )}
    </section>
  );
};

export default Search;
