import TrackSection from "../sections/TrackSection.jsx";

const TopTracks = (
   {
     topTracks,
     details,
     isPending,
     isSuccess
   }) => {
  return (
     <div className="relative mt-8 playlist_tab_content">
       <TrackSection
          data={topTracks?.data}
          details={{
            id: details?.id,
            type: details?.type,
          }}
          disableRowList={["dateCreated"]}
          enableTitle={false}
          skeletonItemNumber={20}
          isLoading={isPending}
          isSuccess={isSuccess}
       />
     </div>
  );
};

export default TopTracks;
