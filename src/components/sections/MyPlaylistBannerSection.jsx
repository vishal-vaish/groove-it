import {useEffect, useMemo, useState} from "react";
import Form from "../Form.jsx";
import Title from "../headers/Title.jsx";
import {editMyPlaylistValidation} from "../../lib/validations/myPlaylist.js";
import {DropdownMenu} from "../DropdownMenu.jsx";
import {useEditMyPlaylist, useRemoveMyPlaylist} from "../../lib/action/playlist.action.js";
import Icon from "../Icon.jsx";
import {usePlayerStore} from "../../lib/store.js";
import usePlayer from "../../hooks/usePlayer.jsx";
import {getFormatData} from "../../lib/utils.js";
import HeaderBannerSectionSkeleton from "../skeletons/HeaderBannerSectionSkeleton.jsx";
import PatternBg from "../PatternBg.jsx";
import {Contributors, Genres, MetaDetails} from "../MediaMetadata.jsx";
import IconButton from "../buttons/IconButton.jsx";
import AppDialog from "../Dialog.jsx";

const EditMyPlaylist = ({details, editMyPlaylist, isSubmitting}) => {
  const [files, setFiles] = useState(null);

  const handleSubmit = async (values) => {
    editMyPlaylist({
      ...values,
      files,
      id: details.id,
      imagePath: details.imagePath,
    });
  };

  const list = useMemo(() => {
    return [
      {
        type: "image_dropzone",
        name: "image",
        label: "Cover Image",
        containerDims: "h-40 w-40",
        props: {
          type: "file",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "title",
        label: "Title",
        props: {
          type: "text",
          placeholder: "",
        },
      },

      {
        type: "textarea",
        name: "desc",
        label: "Description",

        props: {type: "textarea", placeholder: ""},
      },
    ];
  }, []);

  return (
     <div>
       <Title name="Edit Details" type="medium"/>
       <Form
          list={list}
          btnTxt="Save"
          isSubmitting={isSubmitting}
          schema={editMyPlaylistValidation}
          onSubmit={handleSubmit}
          files={files}
          setFiles={setFiles}
          defaultValues={{
            title: details?.name,
            desc: details?.desc,
            image: details?.image,
          }}
       />
     </div>
  );
};

const RemovePlaylistDropdown = ({myPlaylistId}) => {
  const {deleteMyPlaylist, isRemoving} = useRemoveMyPlaylist();

  return (
     <DropdownMenu
        DropdownTrigger={() => (
           <div
              className="w-10 h-10 duration-300 ease-linear scale-[1] rounded-full hover:bg-sidebar hover:scale-[1.05] flex justify-center items-center">
             <Icon name="HiOutlineDotsHorizontal" className="text-onNeutralBg"/>
           </div>
        )}
        DropdownContent={() => (
           <div className="w-[150px]">
             {[
               {
                 label: isRemoving ? "Removing playlist ..." : "Removing playlist",
                 onClick: () => {
                   deleteMyPlaylist(myPlaylistId);
                 },
               },
             ].map((item) => (
                <button
                   key={item.label}
                   className="flex w-full p-3 text-left hover:bg-card-hover disabled:opacity-50 disabled:bg-card-hover"
                   disabled={isRemoving}
                   onClick={() => item.onClick()}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
             ))
             }
           </div>
        )}
     />
  );
};

const MyPlaylistBannerSection = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    details,
    hideActionButtons,
    tracks,
    type: typeAlt,
    showPattern,
  } = props;

  const {editMyPlaylist, isEditing, isEdited} = useEditMyPlaylist();
  const {playlistId, playlistType} = usePlayerStore();
  const {handlePlayPause, handleGetPlaylist, isPlaying} = usePlayer();

  const isCurrentPlaylist = useMemo(
     () => playlistId === details?.id && playlistType === details?.type,
     [details, playlistId, playlistType]
  );

  const trackFormatted = useMemo(() => getFormatData(tracks), [tracks]);

  const handleGetPlaylistFunc = () => {
    handleGetPlaylist({
      tracklist: trackFormatted,
      playlistId: details?.id,
      playlistType: details?.type,
    });
  };

  useEffect(() => {
    if (isEdited) {
      setOpenDialog(false);
    }
  }, [isEdited]);

  const {
    image,
    name,
    type,
    desc,
    genres,
    contributors,
    tracksNo,
    fansNo,
    user,
    duration,
    releaseDate,
  } = details || {};

  return (
     <div className="relative banner_section">
       {!details && (
          <div className="animate_skeleton">
            <HeaderBannerSectionSkeleton type={typeAlt}/>
          </div>
       )}
       {details && (
          <div
             className="relative z-10 flex flex-col items-center gap-6 p-4 rounded xs:flex-row bg-primary-opacity min-h-[250px]">
            <div className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden bg-transparent rounded">
              {showPattern && <PatternBg/>}
            </div>

            {details?.type && (
               <>
                 <button
                    className="aspect-square h-[180px] w-[180px] shadow_card rounded flex_justify_center bg-main z-50"
                    onClick={() => setOpenDialog(true)}
                 >
                   {image ? (
                      <img
                         src={image}
                         width={200}
                         height={200}
                         alt=""
                         className="w-full h-full rounded"
                      />
                   ) : (
                      <Icon
                         name="BsMusicNoteBeamed"
                         size={60}
                         className="!text-secondary"
                      />
                   )}
                 </button>
                 <div className="z-50 flex flex-col items-start justify-between w-full text-onNeutralBg">
                   <div className="gap-2">
                     <div className="flex items-center">
                       <div className="block capitalize">{type}</div>
                       <Genres genres={genres?.data}/>
                     </div>
                     <button
                        onClick={() => setOpenDialog(true)}
                        className="text-left"
                     >
                       <Title
                          name={name}
                          type="extra-large"
                          divider={false}
                          desc={
                             desc || <Contributors contributors={contributors}/>
                          }
                       />
                     </button>

                     <div className="flex items-center gap-3">
                       <MetaDetails
                          {...{user, tracksNo, fansNo, duration, releaseDate}}
                       />
                     </div>
                   </div>
                   {!hideActionButtons && (
                      <div className="flex gap-4">
                        {tracks?.length ? (
                           <IconButton
                              name={
                                isCurrentPlaylist
                                   ? !isPlaying
                                      ? "BsFillPlayFill"
                                      : "BsFillPauseFill"
                                   : "BsFillPlayFill"
                              }
                              className="w-10 h-10 bg-primary"
                              iconClassName="!text-white"
                              size={25}
                              onClick={
                                isCurrentPlaylist
                                   ? handlePlayPause
                                   : handleGetPlaylistFunc
                              }
                           />
                        ) : null}
                        {typeAlt !== "search" && (
                           <RemovePlaylistDropdown myPlaylistId={details?.id}/>
                        )}
                      </div>
                   )}
                 </div>
               </>
            )}
          </div>
       )}
       <AppDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          Content={() => (
             <EditMyPlaylist
                details={details}
                editMyPlaylist={editMyPlaylist}
                isSubmitting={isEditing}
             />
          )}
       />
     </div>
  )
}

export default MyPlaylistBannerSection;