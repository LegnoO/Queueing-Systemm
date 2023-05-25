/** @format */

import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData, addDoc, updateDoc, doc
} from "firebase/firestore";
import { db } from "../firebase";

import { DeviceListType, ServiceListType, SequenceListType, Device, Service, Sequence, RoleListType, Role, AccountListType, Account } from "../types/Api"

export interface User {
  data: {
    username: string;
    password: string;
    email: string;
  };
  id: string;
}

export const fetchDevice = async (): Promise<DeviceListType[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, "device-list")
    );
    const result: DeviceListType[] = querySnapshot.docs.map((doc) => ({
      data: doc.data() as DeviceListType["data"],
      id: doc.id,
    }));
    return result
  } catch (error: any) {
    return error
  }
};

export const fetchService = async (): Promise<ServiceListType[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, "service-list")
    );
    const result: ServiceListType[] = querySnapshot.docs.map((doc) => ({
      data: doc.data() as ServiceListType["data"],
      id: doc.id,
    }));
    return result
  } catch (error: any) {
    return error
  }
};

export const fetchSequence = async (): Promise<SequenceListType[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, "sequence-list")
    );
    const result: SequenceListType[] = querySnapshot.docs.map((doc) => ({
      data: doc.data() as SequenceListType["data"],
      id: doc.id,
    }));
    return result
  } catch (error: any) {
    return error
  }
};

export const fetchRole = async (): Promise<RoleListType[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, "role-list")
    );
    const result: RoleListType[] = querySnapshot.docs.map((doc) => ({
      data: doc.data() as RoleListType["data"],
      id: doc.id,
    }));
    return result
  } catch (error: any) {
    return error
  }
};

export const fetchAccount = async (): Promise<AccountListType[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, "account-list")
    );
    const result: AccountListType[] = querySnapshot.docs.map((doc) => ({
      data: doc.data() as AccountListType["data"],
      id: doc.id,
    }));
    return result
  } catch (error: any) {
    return error
  }
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
    await addDoc(collection(db, "device-list"), data)
  } catch (error: any) {
    console.log(error)
  }
};


export const addService = async (data: Service): Promise<void> => {
  try {
    await addDoc(collection(db, "service-list"), {
      active_status: "Ngưng hoạt động", serial: "2010002", status: "Hoàn thành", ...data,
    }).then(response => console.log(response))
  } catch (error: any) {
    console.log(error)
  }
};

export const updateDevice = async (id: string, data: Device): Promise<void> => {

  await updateDoc(doc(db, "device-list", id), {
    device_name: data.device_name,
    service_usage: data.service_usage,
    device_id: data.device_id,
    device_type: data.device_type,
    username: data.username,
    password: data.password,
    ip: data.ip,
  });
};


export const updateService = (id: string, data: Service): void => {

  updateDoc(doc(db, "service-list", id), {
    ...data,
    service_id: data.service_id,
    service_name: data.service_name,
    describe: data.describe,
    auto_increase: data.auto_increase,
    prefix: data.prefix,
    surfix: data.surfix,
    reset: data.reset,
  })
};

export const updateSequence = (id: string, data: Sequence): void => {

  updateDoc(doc(db, "sequence-list", id), {
    ...data,
    stt: data.stt,
    customer_name: data.customer_name,
    service_name: data.service_name,
    timestamp_start: data.timestamp_start,
    timestamp_end: data.timestamp_end,
    status: data.status,
    source: data.source,
  })
};

export const updateRole = (id: string, data: Role): void => {
  updateDoc(doc(db, "role-list", id), {
    ...data,
    role_name: data.role_name,
    member: data.member,
    describe: data.describe,
    feature_a: data.feature_a,
    feature_b: data.feature_b
  })
};

export const addRole = async (data: Role): Promise<void> => {
  try {
    await addDoc(collection(db, "role-list"), {
      ...data, member: 6,
    }).then(response => console.log(response))
  } catch (error: any) {
    console.log(error)
  }
};

export const addAccount = async (data: Account): Promise<void> => {
  try {
    await addDoc(collection(db, "account-list"), {
      ...data,
    }).then(response => console.log(response))
  } catch (error: any) {
    console.log(error)
  }
};

export const updateAccount = (id: string, data: Account): void => {
  updateDoc(doc(db, "account-list", id), {
    full_name: data.full_name,
    phone_number: data.phone_number,
    email: data.email,
    role: data.role,
    username: data.username,
    password: data.password,
    confirm_password: data.confirm_password,
    status: data.active_status,
  })
};
