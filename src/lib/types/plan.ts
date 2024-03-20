export interface Plan {
  id: string,
  name: string,
  description: string,
  activitiesIds: string[],
  active: boolean
}