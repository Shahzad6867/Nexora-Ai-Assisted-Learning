export interface CreateRequestDTO {
  submitted_by: string;
  request_type: string;
  note : string;
}

export interface UpdateRequestDTO {
  request_id: string;
  submitted_by?: string;
  status_type: string;
  status_note: string;
}
