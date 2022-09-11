import { NetworkStatus } from "@apollo/client";

export type ResponseData = {
  stopPlace: {
    estimatedCalls: EstimatedCallsData[];
    id: string;
    name: string;
  };
};
export type QueryData = {
  abortRef: AbortSignal;
  data: ResponseData;
  loading: boolean;
  networkStatus: NetworkStatus;
};

export type EstimatedCallsData = {
  realtime: boolean;
  aimedArrivalTime: string;
  aimedDepartureTime: string;
  expectedArrivalTime: string;
  expectedDepartureTime: string;
  actualArrivalTime: null;
  actualDepartureTime: null;
  date: string;
  forBoarding: boolean;
  forAlighting: boolean;
  destinationDisplay: {
    frontText: string;
  };
  quay: {
    id: string;
  };
  serviceJourney: {
    journeyPattern: {
      line: {
        id: string;
        name: string;
        transportMode: string;
      };
    };
  };
};
