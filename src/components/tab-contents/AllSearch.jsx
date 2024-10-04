import {useId, useMemo} from "react";
import BannerSection from "../sections/BannerSection.jsx";
import MediaSection from "../sections/MediaSection.jsx";
import TrackSection from "../sections/TrackSection.jsx";

const AllSearch = (
   {
     setCurrentTab,
     data,
     isPending,
     isSuccess,
   }) => {
  const {artists, tracks, albums, playlists, radios} = data || {};
  const radioId = useId();

  const bannerD = useMemo(() => {
    let details, type, tracks;
    if (artists?.data?.length) {
      details = artists?.data[0];
      type = "artist";
      tracks = tracks?.data;
    } else if (albums?.data?.length) {
      details = albums?.data[0];
      type = "album";
      tracks = albums?.data[0]?.tracks;
    } else if (playlists?.data?.length) {
      details = playlists?.data[0];
      type = "playlist";
      tracks = playlists?.data[0]?.tracks;
    }

    return {details, type, tracks};
  }, [albums, artists, playlists]);

  return (
     <div className="relative h-screen mt-8 all_tab_content">
       <div className="grid grid-cols-1 gap-8 md:grid-cols-10">
         <div className="flex flex-col col-span-1 gap-8 md:col-span-6">
           <BannerSection
              details={bannerD?.details}
              tracks={bannerD?.tracks}
              type="search"
              isLoading={isPending}
              isSuccess={isSuccess}
           />

           <MediaSection
              data={artists?.data?.slice(0, 3)}
              title="Artists"
              titleType="medium"
              titleDivider={false}
              type="artist"
              gridNumber={3}
              showMoreLink={() => setCurrentTab("related_artists")}
              cardItemNumber={9}
              isLoading={isPending}
              isSuccess={isSuccess}
           />

           <MediaSection
              data={albums?.data?.slice(0, 3)}
              title="Albums"
              titleType="medium"
              titleDivider={false}
              type="album"
              gridNumber={3}
              showMoreLink={() => setCurrentTab("albums")}
              cardItemNumber={9}
              isLoading={isPending}
              isSuccess={isSuccess}
           />

           <MediaSection
              data={playlists?.data?.slice(0, 3)}
              title="Playlists"
              titleType="medium"
              titleDivider={false}
              type="album"
              gridNumber={3}
              showMoreLink={() => setCurrentTab("playlists")}
              cardItemNumber={9}
              isLoading={isPending}
              isSuccess={isSuccess}
           />
         </div>
         <div className="flex flex-col col-span-1 gap-8 md:col-span-4">
           <div className="sticky top-0">
             <TrackSection
                data={tracks?.data?.slice(0, 5)}
                details={{
                  id: bannerD?.details?.id,
                  type: bannerD?.type,
                }}
                disableHeader
                disableRowList={["album", "actions", "dateCreated"]}
                imageDims="16"
                enableTitle
                listDivider={false}
                titleName="Tracks"
                titleDivider={false}
                titleType="medium"
                showMoreLink={() => setCurrentTab("tracks")}
                showMoreDisplay="bottom"
                isLoading={isPending}
                isSuccess={isSuccess}
             />

             <TrackSection
                data={radios?.data?.slice(0, 6)}
                details={{
                  id: radioId,
                  type: "radio",
                }}
                disableHeader
                disableRowList={["album", "duration", "actions"]}
                imageDims="16"
                enableTitle
                listDivider={false}
                titleName="Radios"
                titleDivider={false}
                titleType="medium"
                isLoading={isPending}
                isSuccess={isSuccess}
             />
           </div>
         </div>
       </div>
     </div>
  );
};

export default AllSearch;
