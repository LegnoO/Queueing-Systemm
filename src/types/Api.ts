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


export interface ServiceListType {
  data: {
    active_status: string,
    describe: string,
    service_id: string,
    service_name: string,
    serial: string,
    status: string,
    auto_increase: boolean,
    prefix: boolean,
    surfix: boolean,
    reset: boolean,
  }
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

export interface Service {
  service_id: string,
  describe: string,
  service_name: string,
  auto_increase: boolean,
  prefix: boolean,
  surfix: boolean,
  reset: boolean,
}

export interface SequenceListType {
  data: {
    stt: string,
    customer_name: string,
    service_name: string,
    timestamp_end: {
      seconds:number,
    nanoseconds:number
  },
    timestamp_start: {
      seconds:number,
    nanoseconds:number
  }
    status: string,
    source: string
  },
  id: string
}

export interface Sequence {
  stt: string,
  customer_name: string,
  service_name: string,
  timestamp_end: Date,
  timestamp_start: Date
  status: string,
  source: string,
}