import MediaSection from "../sections/MediaSection.jsx";

const RelatedArtists = (
   {
     relatedArtists,
     isPending,
     isSuccess,
   }) => {
  return (
     <div className="relative mt-8 playlist_tab_content">
       <MediaSection
          data={relatedArtists?.data}
          enableTitle={false}
          type="artist"
          isSuccess={isSuccess}
          isLoading={isPending}
       />
     </div>
  );
};

export default RelatedArtists;
