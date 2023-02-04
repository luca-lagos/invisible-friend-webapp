import { person } from "./person";

export interface event {
  id: number;
  title: string;
  people: person[];
  date: Date;
  finished?: boolean;
}
