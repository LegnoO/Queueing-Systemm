export interface DeviceListType {
  data: {
    active_status: string;
    device_name: string;
    service_usage: string;
    ip: string;
    connect_status: string;
    device_id: string;
    device_type: string;
    username: string;
    password: string;
  };
  id: string;
}


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