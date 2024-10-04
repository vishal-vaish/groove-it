import {useId, useMemo} from "react";
import {useFetchChartBySection} from "../lib/action/editorial.action.js";
import {getRandomList} from "../lib/utils.js";
import TrackSection from "./sections/TrackSection.jsx";
import Footer from "./layouts/Footer.jsx";

const TopPlay = () => {
  const {
    data: tracks,
    isPending: chartsDataPending,
    isSuccess: chartsDataSuccess,
  } = useFetchChartBySection({
    id: "0",
    section: "tracks",
  });

  const topPickId = useId();

  const randomTopPicks = useMemo(() => {
    const topTracks = tracks?.data || {};
    return topTracks?.length
       ? getRandomList(topTracks, 5, 1, topTracks?.length)
       : [];
  }, [tracks?.data]);

  return (
     <section
        className="top_picks_section xl:fixed top-0 xl:h-screen xl:w-aside min-w-aside hidden-0 relative main_width xl:left-auto mb-[100px] xl:mb-0 h-auto p-3 sm:p-6 xl:p-0 xl:block right-0 overflow-auto"
     >
       <div className="w-full h-full bg-switch">
         <div className="sticky top-0 p-4 rounded bg-switch xl:rounded-none">
           <div className="top_picks_content">
             <TrackSection
                data={randomTopPicks}
                details={{
                  id: topPickId,
                  type: "chart",
                }}
                disableHeader
                disableRowList={[
                  "no",
                  "album",
                  "duration",
                  "more_button",
                  "like_button",
                  "dateCreated",
                ]}
                imageDims="11"
                enableTitle
                titleName="Top Picks"
                titleDivider={false}
                titleType="medium"
                isLoading={chartsDataPending}
                isSuccess={chartsDataSuccess}
             />
           </div>
           <Footer/>
         </div>
       </div>
     </section>
  )
}
export default TopPlay
