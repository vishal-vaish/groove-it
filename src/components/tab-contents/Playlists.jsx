import MediaSection from "../sections/MediaSection.jsx";

const Playlists = ({ playlists, isPending, isSuccess }) => {
  return (
     <div className="relative mt-8 playlist_tab_content">
       <MediaSection
          data={playlists?.data}
          enableTitle={false}
          type="playlist"
          isLoading={isPending}
          isSuccess={isSuccess}
       />
     </div>
  );
};

export default Playlists;
