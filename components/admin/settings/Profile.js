import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Profile = ({ adminId }) => {
  const router = useRouter(); // Use Next.js router for handling routing and query parameters
  const [imgSrc, setImgSrc] = useState(`/images/admin/${adminId}.webp`); // State for storing the profile image URL

  // Effect to update image URL when the timestamp changes
  useEffect(() => {
    if (router.query.time) {
      setImgSrc(`/images/admin/${adminId}.webp?time=${router.query.time}`); // Append timestamp to image URL
    }
  }, [router.query.time]); // Re-run when router.query.time changes

  return (
    <div className="flex flex-col items-center">
      <img
        src={imgSrc}
        alt="Admin Profile"
        className="w-64 h-64 rounded-full border-2 border-black m-4"
      />
    </div>
  );
};

export default Profile;
