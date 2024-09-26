import React , { useEffect, useState }from "react";
import { useRouter } from 'next/router';

const Profile = ({adminId}) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(`/images/admin/${adminId}.webp`);
    // We use this timestamp to update the URL of the image.
  useEffect(() => {
      // If the route has a timestamp parameter, update the image path to include the timestamp
    if (router.query.time) {
      setImgSrc(`/images/admin/${adminId}.webp?time=${router.query.time}`);
    }
  }, [router.query.time]);

  return (
    <div className="flex flex-col items-center">
      <img
        src={imgSrc}
        alt="Admin Profile"
        className="w-64 h-64 rounded-full border-2 border-black"
      />
      <h1 className="text-2xl font-bold mt-4">
        Hello! <span className="text-black">Admin</span>
      </h1>
    </div>
  );
};

export default Profile;
