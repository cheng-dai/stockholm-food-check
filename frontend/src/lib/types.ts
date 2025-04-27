export type Inspection = {
  SummaryColour: string;
  SummaryText: string;
  InspectionDate: string;
};

export type Restaurant = {
  Id: string;
  Name: string;
  Address: string;
  InspectionList: Inspection[];
  lat: number;
  lon: number;
};
