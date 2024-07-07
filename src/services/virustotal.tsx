import axios from 'axios';

const API_KEY = '';

const normalizeDomain = (domain: string): string => {
  try {
    const url = new URL(domain);
    return url.hostname.replace(/^www\./, '').replace(/\/$/, '');
  } catch (error) {
    return domain.replace(/^https?:\/\/(www\.)?/, '').replace(/^www\./, '').replace(/\/$/, '');
  }
};

const getUrlData = async (url: string, apiKey: string) => {
  try {
    const response = await axios.post(
      'https://www.virustotal.com/api/v3/urls',
      `url=${encodeURIComponent(url)}`,
      {
        headers: {
          'x-apikey': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const analysisId = response.data.data.id;
    const analysisResponse = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
      headers: {
        'x-apikey': apiKey,
      },
    });

    return analysisResponse.data;
  } catch (error) {
    console.error('Error fetching URL data:', error);
    throw error;
  }
};

const getIpData = async (ip: string, apiKey: string) => {
  try {
    const response = await axios.get(`https://www.virustotal.com/api/v3/ip_addresses/${ip}`, {
      headers: {
        'x-apikey': apiKey || API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw error;
  }
};

const getDomainData = async (domain: string, apiKey: string) => {
  try {
    const normalizedDomain = normalizeDomain(domain);
    const response = await axios.get(`https://www.virustotal.com/api/v3/domains/${normalizedDomain}`, {
      headers: {
        'x-apikey': apiKey || API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching domain data:', error);
    throw error;
  }
};

const getFileData = async (file: File | null, apiKey: string) => {
  if (!file) {
    throw new Error('No file provided');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await axios.post('https://www.virustotal.com/api/v3/files', formData, {
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'multipart/form-data',
      },
    });

    const fileId = uploadResponse.data.data.id;
    const analysisResponse = await axios.get(`https://www.virustotal.com/api/v3/analyses/${fileId}`, {
      headers: {
        'x-apikey': apiKey,
      },
    });

    return analysisResponse.data;
  } catch (error) {
    console.error('Error fetching file data:', error);
    throw error;
  }
};

export { getUrlData, getIpData, getDomainData, getFileData };
