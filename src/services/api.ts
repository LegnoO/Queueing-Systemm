/** @format */

import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData, addDoc, updateDoc, doc
} from "firebase/firestore";
import { db } from "../firebase";
import {
  fetchDeviceStart,
  fetchDeviceSuccess,
  fetchDeviceFailure,
} from "../features/deviceSlice";
import { DeviceListType, Device } from "../types/Api"
import { Dispatch, AnyAction } from "redux";

export interface User {
  data: {
    username: string;
    password: string;
    email: string;
  };
  id: string;
}

export const fetchDevice = (): ((dispatch: Dispatch<AnyAction>) => void) => {
  return async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    let result: string | DeviceListType[]
    try {
      dispatch(fetchDeviceStart());
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, "device-list")
      );
      const result: DeviceListType[] = querySnapshot.docs.map((doc) => ({
        data: doc.data() as DeviceListType["data"],
        id: doc.id,
      }));
      dispatch(fetchDeviceSuccess(result));
    } catch (error: any) {
      dispatch(fetchDeviceFailure(error));
      // return result = error
    }
  };
};



export const fetchUser = async (): Promise<User[]> => {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, "users")
  );
  const result = querySnapshot.docs.map((doc) => ({
    data: doc.data() as User["data"],
    id: doc.id,
  }));

  return result;
};


export const addDevice = async (data: Device): Promise<void> => {
  try {
    await addDoc(collection(db, "device-list"), { data })
  } catch (error: any) {
    console.log(error)
  }
};


export const updateDateTicket = async (id: string, data:  Device ): Promise<void> => {
  console.log(id," ",data)
  // await updateDoc(doc(db, "device-list", id), data);
};
