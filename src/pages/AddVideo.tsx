
import Wrapper from '../assets/wrappers/DashboardFormPage';
import SubmitBtn from '../components/SubmitBtn';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Form, redirect } from 'react-router-dom';
import FormRowSelect from '../components/FormRowSelect';
import FormTextArea from '../components/FormTextArea';
import { useState } from 'react';
import { tagQuery } from './AddTages';

import { ImCross } from "react-icons/im";
import TagsWrapper from '../assets/wrappers/AddTages';

export const loader = (queryclient: any) => async ({ params, request }: any) => {
  console.log(params, request);

  await queryclient.ensureQueryData(tagQuery);
  return null;
}

export const action =
  (queryClient: any) =>
    async ({ request }: any) => {
      const formData = await request.formData();
      for (var pair of formData.entries()) {
        if (pair[0] === 'tag') {
          formData.delete('tag');
        }
      }
      for (const entry of formData) {
        console.log(entry);
      }
      try {
        const res = await customFetch.post('/addvideo', formData);
        console.log(res);
        queryClient.invalidateQueries(['videos']);
        toast.success('Video added successfully ');

        return redirect('/dashboard');;
      } catch (error: any) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };


export const AddVideo = () => {
  const [videoTags, setvideoTags] = useState<any>([]);
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
  return (
    <Wrapper>
      <Form method='post' className='form' encType="multipart/form-data">
        <h4 className='form-title'>add Video</h4>
        <div className='form-center'>
          <FormRow type='text' name='title' labelText='Title' required={true} />
          <FormRow type='file' name='image' labelText='Tumbnail' required={true} />
          <FormRow type='file' name='video' labelText='Video' required={true} />
          <FormTextArea name="description" labelText="description" />
          <FormTextArea name="meta" labelText="meta" />
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
          <SubmitBtn formBtn />
        </div>
      </Form >
    </Wrapper >
  );
};
