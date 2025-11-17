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

// type for the feature slide
export interface FeatureSlide {
  title: string;
  description: string;
  language: string;
  code: string;
  terminalOutput?: string;
  optimizedCode?: string;
  codeQualityScore?: number;
}

// type for the contact form
export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

// type for the language dropdown
export interface LanguageDropdownProps {
  language: string;
  setLanguage: (lang: string) => void;
}

// type for the service dropdown
export interface ServiceDropdownProps {
  service: string;
  setService: (service: string) => void;
}
