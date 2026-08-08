export type ApiResponse<T> = {
  message: string;
  data: T;
  statusCode: number;
  success: boolean;
};

export const QUOTATION_STATUS = {
  PENDING: "PENDING",
  QUOTED: "QUOTED",
  SENT_TO_CUSTOMER: "SENT TO CUSTOMER",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  RE_QUOTED: "RE QUOTED",
} as const;

export const JOB_STATUS = {
  PENDING: "PENDING",
  SUBMITTED: "SUBMITTED",
} as const;

export type Status = typeof QUOTATION_STATUS[keyof typeof QUOTATION_STATUS] | typeof JOB_STATUS[keyof typeof JOB_STATUS];

export type Filters<S = Status> = {
  skip?: number;
  limit?: number;
  search?: string;
  status?: S;
  isActive?: boolean | null;
};