import {
  collection as firebaseCollection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  addDoc,
  getCountFromServer,
  orderBy,
  deleteDoc,
  onSnapshot,
} from "@firebase/firestore";
import {db, storage} from "../config/firebase.config.js";
import {
  deleteObject,
  getDownloadURL,
  uploadBytes,
  ref
} from "@firebase/storage";
import axios from "axios";
import imageCompression from "browser-image-compression";

const BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL;

export const uploadImage = async ({imageFile, storagePath, fileName}) => {
  const compressImgOption = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(imageFile, compressImgOption);

  const storageRef = ref(
     storage,
     `${storagePath}/${fileName || compressedFile.name}`
  );
  const snapshot = await uploadBytes(storageRef, compressedFile);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export const fbAddDoc = async ({data, collection}) =>
   await addDoc(firebaseCollection(db, collection), data);

export const fbSetDoc = async ({data, id, collection}) =>
   await setDoc(doc(db, collection, id), data);

export const fbGetDoc = async ({collection, id}) =>
   await getDoc(doc(db, collection, id));

export const fbUpdateDoc = async ({ data, collection, id }) =>
   await updateDoc(doc(db, collection, id), data);

export const fbDeleteDoc = async ({collection, id}) =>
   await deleteDoc(doc(db, collection, id));

export const fbGetCollection = async (
   {
     collection,
     whereQueries = [],
     orderByQueries = [],
   }) => {
  const whereQ = whereQueries.map((item) => {
    const [key, sign, value] = item;
    return where(key, sign, value);
  });
  const orderByQ = orderByQueries.map((item) => {
    const [key, value] = item;
    return orderBy(key, value);
  });

  const q = query(firebaseCollection(db, collection), ...whereQ, ...orderByQ);
  return await getDocs(q);
}

export const fbSnapshotDoc = ({collection, id, callback}) => {
  if (id) {
    return onSnapshot(doc(db, collection, id), (doc) => {
      callback(doc);
    });
  }
};

export const fbDeleteStorage = async (storagePath) => {
  await deleteObject(ref(storage, storagePath));
};

export const fbCountCollection = async ({collection, whereQueries}) => {
  const whereQ = whereQueries.map((item) => {
    const [key, sign, value] = item;
    return where(key, sign, value);
  });

  const q = query(firebaseCollection(db, collection), ...whereQ);
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

const getBaseUrl = (endpoint) => {
  return `${BACKEND_URL}/${endpoint}`;
};

export const apiQuery = async ({endpoint, config, method = "GET"}) => {
  try {
    const options = {
      url: getBaseUrl(endpoint),
      method,
      ...config,
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    let err = error.response
       ? {
         message:
            error.response.data.responseMessage || error.response.data.error,
       }
       : error;
    throw new Error(err);
  }
};