const config = {
    baseIp: 'http://192.168.18.8', // Common IP
    ports: {
      database: '5001',
      health: '5000',
      disease: '5002',
      rice_classification: '5003',
      nutrition_extract_single_grain: '5004',
      nutrition_extract_multi_grain: '5005',
    },
    getUrl: (portName) => `${config.baseIp}:${config.ports[portName]}`,
  };
  
  export default config;
  