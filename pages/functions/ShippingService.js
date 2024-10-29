// pages/functions/shippingService.js
const axios = require('axios');

// UPS 追踪查询服务
const getUPSOrderStatus = async (trackingNumber) => {
  const apiUrl = 'https://onlinetools.ups.com/rest/Track';
  const apiKey = process.env.UPS_API_KEY;
  const username = process.env.UPS_USERNAME;
  const password = process.env.UPS_PASSWORD;

  const requestData = {
    UPSSecurity: {
      UsernameToken: {
        Username: username,
        Password: password,
      },
      ServiceAccessToken: {
        AccessLicenseNumber: apiKey,
      },
    },
    TrackRequest: {
      Request: {
        RequestOption: '1',
      },
      InquiryNumber: trackingNumber,
    },
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching UPS tracking data:', error);
    throw error;
  }
};

// FedEx 追踪查询服务
const getFedExOrderStatus = async (trackingNumber) => {
  const apiUrl = `https://www.fedex.com/trackingCal/track`;
  const apiKey = process.env.FEDEX_API_KEY;

  const requestData = {
    TrackPackagesRequest: {
      appType: 'wtrk',
      uniqueKey: '',
      processingParameters: {},
      trackingInfoList: [
        {
          trackNumberInfo: {
            trackingNumber: trackingNumber,
            trackingQualifier: '',
            trackingCarrier: '',
          },
        },
      ],
    },
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching FedEx tracking data:', error);
    throw error;
  }
};

// DHL 追踪查询服务
const getDHLOrderStatus = async (trackingNumber) => {
  const apiUrl = `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`;
  const apiKey = process.env.DHL_API_KEY;

  try {
    const response = await axios.get(apiUrl, {
      headers: { 'DHL-API-Key': apiKey },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching DHL tracking data:', error);
    throw error;
  }
};

// Canada Post 追踪查询服务
const getCanadaPostOrderStatus = async (trackingNumber) => {
  const apiUrl = `https://soa-gw.canadapost.ca/vis/track/pin/${trackingNumber}/summary`;
  const username = process.env.CANADAPOST_USERNAME;
  const password = process.env.CANADAPOST_PASSWORD;

  try {
    const response = await axios.get(apiUrl, {
      auth: { username, password },
      headers: { Accept: 'application/vnd.cpc.track+xml' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Canada Post tracking data:', error);
    throw error;
  }
};

module.exports = {
    getUPSOrderStatus,
    getFedExOrderStatus,
    getDHLOrderStatus,
    getCanadaPostOrderStatus
};