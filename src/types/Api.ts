export interface Device {
  active_status: string;
  device_name: string;
  service_usage: string;
  ip: string;
  connect_status: string;
  device_id: string;
  device_type: string;
  username: string;
  password: string;
}
export interface DeviceListType {
  data: Device
  id: string;
}

export interface Service {
  status: string
  active_status: string,
  serial?: string,
  service_id: string,
  describe: string,
  service_name: string,
  auto_increase: boolean,
  prefix: boolean,
  surfix: boolean,
  reset: boolean,
}


export interface ServiceListType {
  data: Service
  id: string;

}




interface Timestamp {
  seconds: number;
  nanoseconds: number;
}



export interface Sequence {
  stt: string,
  customer_name: string,
  service_name: string,
  timestamp_end: Timestamp,
  timestamp_start: Timestamp,
  status: string,
  source: string,
  email: string,
  phone: string,
}

export interface SequenceListType {
  data: Sequence
  id: string
}




export interface Role {
  role_name: string,
  member: number,
  describe: string,
  feature_a: string[],
  feature_b: string[]
}

export interface RoleListType {
  data: Role
  id: string
}


export interface Account {
  full_name: string;
  phone_number: string;
  email: string;
  role: string;
  username: string;
  password: string
  active_status: string;
}

export interface AccountListType {
  data: Account,
  id: string
}


export interface Activity {
  username: string,
  logged_time: Timestamp
  ip: string
  logged: string
}


export interface ActivityListType {
  data: Activity,
  id: string
}


export interface User {
  email: string,
  username: string,
  password: string
}

export interface UserListType {
  data: User,
  id: string
}
