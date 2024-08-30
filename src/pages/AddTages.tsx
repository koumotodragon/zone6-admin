
import Wrapper from '../assets/wrappers/DashboardFormPage';
import SubmitBtn from '../components/SubmitBtn';
import FormRow from '../components/FormRow';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import TagsWrapper from '../assets/wrappers/AddTages';
import { Form } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSubmit } from "react-router-dom";
import { ImCross } from "react-icons/im";
export const tagQuery = {
  queryKey: ['tags'],
  queryFn: async () => {
    const { data } = await customFetch.get('/tags');
    return data;
  }
}

export const loader = (queryclient: any) => async () => {
  await queryclient.ensureQueryData(tagQuery);
  return null;
}

export const action =
  (queryClient: any) =>
    async ({ params, request }: any) => {
      const formData = await request.formData();
      //for deleteing tags
      if (formData.has('delete')) {
        const deleteID = formData.get('id');
        console.log(params, formData.get('id'));
        try {
          const res = await customFetch.delete(`/tag/${deleteID}`);
          console.log(res);
          queryClient.invalidateQueries(['tags']);
          toast.success('Tag Deleted successfully ');
          return null;
        } catch (error: any) {
          toast.error(error?.response?.data?.msg);
          return error;
        }
      }
      //for adding tags
      try {
        const res = await customFetch.post('/add-tag', formData);
        console.log(res);
        queryClient.invalidateQueries(['tags']);
        toast.success('Tag added successfully ');
        return null;
      } catch (error: any) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };


export const AddTages = () => {
  const { data: { tags } }: any = useQuery(tagQuery);
  // console.log(tags);
  const submit = useSubmit();
  const deleteTag = (id: number) => {
    const confirmation = window.confirm("are you sure to delete this tag!");
    if (confirmation) {
      submit(
        {
          delete: "yes",
          id: id
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
        <h4 className='form-title'>add Tages</h4>
        <div className='form-center'>
          <FormRow type='text' name='name' labelText='Tag name' />
          <SubmitBtn formBtn />
        </div>
      </Form>
      <TagsWrapper>
        <div className="tag-section" style={{ marginTop: "20px" }}>
          <ul>
            {tags.map((tag: any) => {
              return (
                <li key={tag._id}>
                  <p>
                    {tag.name}
                  </p>
                  <div onClick={() => deleteTag(tag._id)}>
                    <ImCross />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </TagsWrapper>
    </Wrapper >
  );
};
