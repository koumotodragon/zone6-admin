// import React from 'react';
// import { toast } from 'react-toastify';
// import { JobsContainer, SearchContainer } from './components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageBtnContainer from '../components/PageBtnContainer';
import { Video } from '../components/Video';
import AllVideosWrapper from '../assets/wrappers/AllVideos';
const allVideosQuery = (params: any) => {
  const { page } = params;
  return {
    queryKey: [
      'videos',
      page ?? 1
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/videos', {
        params
      })
      return data;
    },
  };
};

export const loader = (queryClient: any) => async ({ request }: any) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  await queryClient.ensureQueryData(allVideosQuery(params));
  return { searchValues: { ...params } };
}

const AllVideosContext = createContext<any | undefined>(undefined);
export const AllVideos = () => {
  const { searchValues }: any = useLoaderData();
  const { data } = useQuery(allVideosQuery(searchValues));
  console.log(data);

  return (
    <AllVideosContext.Provider value={data}>
      <>
        <AllVideosWrapper>

          {data.videos.map((video: any) => {
            return (
              <Video img={video.thumbnail} id={video._id} title={video.title} views={video.views} />
              // {/* <div key={index}>
              //   {video.title}
              // </div>) */}
            )
          })}

        </AllVideosWrapper>
        {data.numOfPages > 1 && <PageBtnContainer />}
      </>
    </AllVideosContext.Provider>
  );
};
export const useAllVideosContext = () => useContext(AllVideosContext);