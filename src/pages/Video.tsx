
import Wrapper from '../assets/wrappers/DashboardFormPage';

import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Form, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import FormRowSelect from '../components/FormRowSelect';
import FormTextArea from '../components/FormTextArea';
import { useState } from 'react';
import { tagQuery } from './AddTages';

import { ImCross } from "react-icons/im";
import TagsWrapper from '../assets/wrappers/AddTages';

export const loader = (queryclient: any) => async ({ params }: any) => {
  await queryclient.ensureQueryData(tagQuery);
  // console.log(params.id);
  try {
    const res = await customFetch.get(`/videos/${params.id}`);
    // console.log(res.data.video);
    return { currentVideo: res.data.video };
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export const action =
  (queryClient: any) =>
    async ({ request, params }: any) => {

      const formData = await request.formData();
      //for deleteing
      if (formData.has('delete')) {
        console.log('deleting');
        try {
          const res = await customFetch.delete(`/video/${params.id}`);
          console.log(res);
          queryClient.invalidateQueries(['videos']);
          toast.success('Video delete successfully ');

          return redirect('/dashboard/all-videos');;
        } catch (error: any) {
          toast.error(error?.response?.data?.msg);
          return error;
        }
      }
      //for updating
      for (var pair of formData.entries()) {
        if (pair[0] === 'tag') {
          formData.delete('tag');
        }
      }
      for (const entry of formData) {
        console.log(entry);
      }
      try {
        const res = await customFetch.patch(`/video/${params.id}`, formData);
        console.log(res);
        queryClient.invalidateQueries(['videos']);
        toast.success('Video updated successfully ');

        return redirect('/dashboard/all-videos');;
      } catch (error: any) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };


export const Video = () => {
  const { currentVideo }: any = useLoaderData();
  // console.log(currentVideo);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const submit = useSubmit();
  const [videoTags, setvideoTags] = useState<any>(currentVideo.tags);
  const { data: { tags } }: any = useQuery(tagQuery);
  const tagChange = (e: any) => {
    const temp = e.currentTarget.value;
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const tempId = selectedOption.getAttribute('data-id');
    setvideoTags((prev: any) => {
      if (prev.some((item: any) => item.name == temp) || temp == "none") {
        return prev;
      }
      return [...prev, { tagId: tempId, name: temp }];
    })
  }

  const deleteTag = (id: any) => {
    setvideoTags((prev: [any]) => {
      const newTags = prev.filter((tag) => tag.tagId !== id);
      return newTags;
    })
  }
  const deleteVideo = () => {
    const confirmation = window.confirm("are you sure to delete this Video!");
    if (confirmation) {
      submit(
        {
          delete: "yes",
        },
        {
          method: "post",
          encType: "application/x-www-form-urlencoded",
        }
      );
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form' encType="multipart/form-data">
        <h4 className='form-title'>add Video</h4>
        <div className='form-center'>
          <FormRow type='text' name='title' labelText='Title' defaultValue={currentVideo.title} />
          {/* <FormRow type='file' name='image' labelText='Tumbnail' /> */}
          {/* <FormRow type='file' name='video' labelText='Video' /> */}
          <FormTextArea name="description" labelText="description" defaultValue={currentVideo.description} />
          <FormTextArea name="meta" labelText="meta" defaultValue={currentVideo.meta} />
          <TagsWrapper >
            <div className="tag-section">
              <FormRowSelect name="tag" list={[{ name: "none", _id: "none" }, ...tags.map((tag: any) => tag)]} onChange={tagChange} />

              <ul>{videoTags.map((tag: any) => {
                return (
                  <li key={tag.tagId}>
                    <p>
                      {tag.name}
                    </p>
                    <div onClick={() => deleteTag(tag.tagId)}>
                      <ImCross />
                    </div>
                  </li>

                )
              })}</ul>

            </div>
          </TagsWrapper>
          <input type='text' name="tags" value={JSON.stringify(videoTags)} style={{ display: "none" }} readOnly />
          <button
            type='submit'
            className={`btn btn-block form-btn `}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'updating' : 'update'}
          </button>
          <div
            className="btn btn-block form-btn" onClick={deleteVideo}>
            {isSubmitting ? 'Deleteing' : 'Delete'}
          </div>
        </div>
      </Form >
    </Wrapper >
  );
};
