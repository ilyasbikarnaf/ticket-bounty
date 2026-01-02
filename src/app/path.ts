export const homePath = () => "/";

export const ticketsPath = () => "/tickets";
export const ticketPath = (path: string | number) => `/tickets/${path}`;
export const ticketEditPath = (path: string | number) =>
  `/tickets/${path}/edit`;
