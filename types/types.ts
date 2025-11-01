//  file to setup the types for the application

// type for user signup
export interface UserSignup {
  username: string;
  email: string;
  password: string;
}

// type for the user login
export interface UserLogin {
  email: string;
  password: string;
}
