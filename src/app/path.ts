export const homePath = () => "/";

export const ticketsPath = () => "/tickets";
export const ticketPath = (path: string | number) => `/tickets/${path}`;
export const ticketEditPath = (path: string | number) =>
  `/tickets/${path}/edit`;

export const signupPath = () => "/sign-up";
export const signinPath = () => "/sign-in";
export const passwordForgotPath = () => "/password-forgot";

export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";
