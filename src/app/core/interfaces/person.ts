export interface person {
  name: string;
  gift_to?: string;
  view_to?: boolean;
}

export const empty_person: person = {
  name: '',
  gift_to: '',
  view_to: false,
};
