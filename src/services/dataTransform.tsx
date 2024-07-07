/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DomainData {
  id: string;
  analysisEngine: string;
  category: string;
  result: string;
}

export interface UrlData {
  id: string;
  analysisEngine: string;
  category: string;
  result: string;
}

export interface IpData {
  id: string;
  analysisEngine: string;
  category: string;
  result: string;
}

export interface FileData {
  id: string;
  analysisEngine: string;
  category: string;
  result: string;
}

export interface FileHashData {
  id: string;
  hash: string;
  result: string;
}

export const transformDomainData = (data: any): DomainData[] => {
  const analysisResults = data.data.attributes.last_analysis_results;

  return Object.entries(analysisResults).map(([engine, result]: [string, any]) => ({
    id: engine,
    analysisEngine: engine,
    category: result.category,
    result: result.result,
  }));
};

export const transformUrlData = (data: any): UrlData[] => {
  const analysisResults = data.data.attributes.results;

  return Object.entries(analysisResults).map(([engine, result]: [string, any]) => ({
    id: engine,
    analysisEngine: engine,
    category: result.category,
    result: result.result,
  }));
};

export const transformIpData = (data: any): IpData[] => {
  const analysisResults = data.data.attributes.last_analysis_results;

  return Object.entries(analysisResults).map(([engine, result]: [string, any]) => ({
    id: engine,
    analysisEngine: engine,
    category: result.category,
    result: result.result,
  }));
};

export const transformFileData = (data: any): FileData[] => {
  const analysisResults = data.data.attributes.last_analysis_results;

  if (!analysisResults || Object.keys(analysisResults).length === 0) {
    return [];
  }

  return Object.entries(analysisResults).map(([engine, result]: [string, any]) => ({
    id: engine,
    analysisEngine: engine,
    category: result.category,
    result: result.result,
  }));
};

export const transformFileHashData = (data: any): FileHashData[] => {
  const hashResults = data.meta.file_info;

  const specificAttributes: Record<string, string | number> = {
    md5: hashResults.md5,
    sha1: hashResults.sha1,
    sha256: hashResults.sha256,
  };

  return Object.entries(specificAttributes).map(([key, value], index) => ({
    id: `${key}-${index}`,
    hash: key,
    result: String(value),
  }));
};
