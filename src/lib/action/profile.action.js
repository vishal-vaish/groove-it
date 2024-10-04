import useLocalStorage from "use-local-storage";
import {useMutation} from "@tanstack/react-query";
import {useCurrentUser} from "../store.js";
import {fbSnapshotDoc, fbUpdateDoc, uploadImage} from "../helpers.js";
import {useEffect, useState} from "react";
import useNotification from "../../hooks/useNotification.jsx";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile
} from "@firebase/auth";
import {auth} from "../../config/firebase.config.js";

export const useGetProfile = () => {
  const [, setThemeLS] = useLocalStorage("groove-theme-config");
  const [, setPlayerLS] = useLocalStorage("groove-player");

  const {currentUser, getUserProfile} = useCurrentUser();
  const {user} = currentUser || {};

  const [prof, setProf] = useState(null);
  useEffect(() => {
    const callback = (doc) => {
      setProf(doc?.data());
      setThemeLS(doc?.data()?.prefs);
      setPlayerLS(doc?.data()?.player);
      getUserProfile(doc?.data());
    };

    const unsub = fbSnapshotDoc({
      collection: "users",
      id: user?.uid,
      callback,
    });

    return () => unsub;
  }, [setPlayerLS, setThemeLS, user?.uid]);

  return prof;
};

export const useUpdateProfile = () => {
  const {currentUser} = useCurrentUser();
  const {userId} = currentUser || {};

  const [notify] = useNotification();

  const {
    mutate: updateUserProfile,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {
      if (userId) {
        try {
          let profileImage = null;
          if (values?.files) {
            profileImage = await uploadImage({
              imageFile: values?.files[0],
              storagePath: `users/${userId}`,
              fileName: "avatar.jpg",
            });
          }

          await updateProfile(auth.currentUser, {
            photoURL: profileImage,
            displayName: values?.username,
          });

          await fbUpdateDoc({
            data: {username: values?.username, photoURL: profileImage},
            collection: "users",
            id: userId,
          });

          notify({
            title: "Success",
            variant: "success",
            description: "Profile updated successfully",
          });
        } catch (err) {
          console.error("error", err);
          notify({
            title: "Error",
            variant: "error",
            description: "An error occurred!",
          });
        }
      }
    },
  });

  return {updateUserProfile, isSubmitting, isSubmitted};
};

export const useUpdateAccountTheme = () => {
  const [, setThemeLS] = useLocalStorage("groove-theme-config");

  const {currentUser} = useCurrentUser();
  const {userId} = currentUser || {};

  const {
    mutate: updateTheme,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (prefs) => {
      if (userId) {
        try {
          await fbUpdateDoc({
            data: {prefs},
            collection: "users",
            id: userId,
          });
        } catch (err) {
          console.error("error", err);
        }
      } else {
        setThemeLS(prefs);
      }
    },
  });

  return {updateTheme, isSubmitting, isSubmitted};
};

export const useUpdateAccountPlayer = () => {
  const [, setPlayerLS] = useLocalStorage("groove-player");

  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const {
    mutate: updatePlayer,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (player) => {
      if (userId) {
        try {
          await fbUpdateDoc({
            data: { player: player },
            collection: "users",
            id: userId,
          });
        } catch (err) {
          console.error("error", err);
        }
      } else {
        setPlayerLS(player);
      }
    },
  });

  return { updatePlayer, isSubmitting, isSubmitted };
};

export const useUpdatePassword = () => {
  const {currentUser} = useCurrentUser();
  const {userId} = currentUser || {};

  const [notify] = useNotification();

  const {
    mutate: updatePass,
    isPending: isSubmitting,
    isSuccess: isSubmitted,
  } = useMutation({
    mutationFn: async (values) => {
      if (userId) {
        try {
          const credential = EmailAuthProvider.credential(
             auth.currentUser.email,
             values?.currentPassword
          );
          await reauthenticateWithCredential(auth?.currentUser, credential);
          await updatePassword(auth?.currentUser, values?.newPassword);

          notify({
            title: "Success",
            variant: "success",
            description: "Password updated successfully",
          });
        } catch (error) {
          console.error("error", error);
          notify({
            title: "Error",
            variant: "error",
            description: "An error occurred!",
          });
        }
      }
    },
  });

  return {updatePass, isSubmitting, isSubmitted};
}