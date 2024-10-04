import MediaSection from "../sections/MediaSection.jsx";

const Albums = (
   {
     albums,
     isPending,
     isSuccess
   }) => {
  return (
     <div className="playlist_tab_content">
       <MediaSection
          data={albums?.data}
          enableTitle={false}
          type="album"
          isLoading={isPending}
          isSuccess={isSuccess}
       />
     </div>
  );
};

export default Albums;
