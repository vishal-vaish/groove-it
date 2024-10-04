import {usePlayerStore} from "../../lib/store.js";
import {useMemo} from "react";
import {classNames, getFormatData} from "../../lib/utils.js";
import {useFetchMyPlaylists} from "../../lib/action/playlist.action.js";
import usePlayer from "../../hooks/usePlayer.jsx";
import TitleSkeleton from "../skeletons/TitleSkeleton.jsx";
import TrackCardSkeleton from "../skeletons/TrackCardSkeleton.jsx";
import Title from "../headers/Title.jsx";
import TrackCard from "../cards/TrackCard.jsx";

export default function TrackSection(
   {
     data,
     details,
     disableHeader,
     disableRowList = [""],
     imageDims = "16",
     skeletonItemNumber = 5,
     enableTitle,
     titleDivider = true,
     titleName,
     titleType,
     showMoreLink,
     showMoreDisplay,
     listDivider = true,
     myPlaylistId,
     className,
     isLoading,
     isSuccess,
   }) {
  useFetchMyPlaylists();
  const {playlistId, trackId, trackType} = usePlayerStore() || {};
  const {handlePlayPause, handleGetPlaylist, isPlaying} = usePlayer();

  const trackFormatted = useMemo(() => getFormatData(data), [data]);
  const handleTrackClick = ({id, type, index}) => {
    if (trackId === id) {
      handlePlayPause();
    } else {
      handleGetPlaylist({
        tracklist: trackFormatted,
        playlistId: details?.id,
        playlistType: details?.type,
        trackIndex: index,
        trackId: id,
        trackType: type,
      });
    }
  };

  return (
     <>
       {isLoading && (
          <div className="animate_skeleton">
            {enableTitle && <TitleSkeleton type="top-pick"/>}
            <TrackCardSkeleton
               number={skeletonItemNumber}
               imageDims={imageDims}
            />
          </div>
       )}

       {isSuccess && data?.length ? (
          <div className="track_section">
            {enableTitle && (
               <Title
                  name={titleName || ""}
                  type={titleType}
                  divider={titleDivider}
                  {...(showMoreDisplay === "top" && {
                    showMoreLink,
                  })}
               />
            )}
            <div>
              {!disableHeader && <Title name="Songs" type="medium"/>}

              <div className={classNames("list_content", className)}>
                <ul className="flex flex-col w-full list-none">
                  {trackFormatted?.length &&
                     trackFormatted?.map((item) => {
                       return (
                          <TrackCard
                             key={item.id}
                             item={item}
                             {...{
                               item,
                               trackId,
                               trackType,
                               playlistId,
                               details,
                               isPlaying,
                               myPlaylistId,
                               listDivider,
                               disableRowList,
                               handleTrackClick,
                               imageDims,
                             }}
                          />
                       )
                     })}
                </ul>
              </div>
            </div>
          </div>
       ) : null}
     </>
  )
}
