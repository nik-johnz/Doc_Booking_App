import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {/* Profile */}
      {
        isEdit
          ? <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          : <img className='w-36 rounded-xl' src={userData.image} alt="" />
      }
      {
        isEdit
          ? <input className='text-3xl font-medium mx-w-60 mt-4' type="text" value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      {/* Contaact Information */}
      <div>
        <div>
          <p className='font-bold text-lg text-neutral-400 mt-3'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700'>

            <p className='font-medium'>Email : </p>
            <p className='text-blue-500'>{userData.email}</p>

            <p className='font-medium'>Phone :</p>
            {
              isEdit
                ? <input className='bg-gray-200 rounded px-2 max-w-56' type="text" value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} />
                : <p className='text-blue-500'>{userData.phone}</p>
            }

            <p className='font-medium'>Address :</p>
            {
              isEdit
                ? <p>
                  <input className='bg-gray-200 rounded px-2 w-56 mb-1' type="text" value={userData.address.line1} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                  <br />
                  <input className='bg-gray-200 rounded px-2 w-56' type="text" value={userData.address.line2} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                </p>
                : <p className='text-gray-500'>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
            }
          </div>
        </div>
        {/* Basic Information */}
        <div>
          <p className='font-bold text-lg text-neutral-400 mt-3'>BASIC INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700'>
            <p className='font-medium'>Gender :</p>
            {
              isEdit
                ? <select className='max-w-32 bg-gray-200 rounded px-2' onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                  <option className='text-gray-500' value="Male">Male</option>
                  <option className='text-gray-500' value="Female">Female</option>
                </select>
                : <p className='text-gray-500'>{userData.gender}</p>
            }
            <p className='font-medium'>Birth Day :</p>
            {
              isEdit
                ? <input className='bg-gray-200 rounded px-2 max-w-32' type="date" value={userData.dob} onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} />
                : <p className='text-gray-500'>{userData.dob}</p>
            }
          </div>
        </div>

        <div className='mt-10'>
          {
            isEdit
              ? <button className='hover:bg-green-500 hover:text-white text-black border border-green-500 px-10 py-2 rounded-xl transition-all duration-500' onClick={updateUserProfileData}>Save Information</button>
              : <button className='hover:bg-blue-500 hover:text-white text-black border border-blue-500 px-10 py-2 rounded-xl transition-all duration-500' onClick={() => setIsEdit(true)}>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile;

