import React from "react";
import { useAuth } from "../../hooks/useAuth";

function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user && (
        <>
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
}

export default UserProfile;
