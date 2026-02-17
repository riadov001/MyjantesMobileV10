import { fetch } from "expo/fetch";

const API_BASE = "https://appmyjantes.mytoolsgroup.eu";

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  isFormData?: boolean;
}

let sessionCookie: string | null = null;

export function setSessionCookie(cookie: string | null) {
  sessionCookie = cookie;
}

export function getSessionCookie() {
  return sessionCookie;
}

export async function apiCall<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, isFormData = false } = options;

  const fetchHeaders: Record<string, string> = {
    ...headers,
  };

  if (!isFormData && body) {
    fetchHeaders["Content-Type"] = "application/json";
  }

  if (sessionCookie) {
    fetchHeaders["Cookie"] = sessionCookie;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: fetchHeaders,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    sessionCookie = setCookie;
  }

  if (!res.ok) {
    let errorMessage = `Erreur ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return res.json() as Promise<T>;
  }

  return {} as T;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  postalCode: string | null;
  city: string | null;
  profileImageUrl: string | null;
  role: "client" | "client_professionnel";
  garageId: string | null;
  companyName: string | null;
  siret: string | null;
  tvaNumber: string | null;
  companyAddress: string | null;
  companyPostalCode: string | null;
  companyCity: string | null;
  companyCountry: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  garageId: string | null;
  name: string;
  description: string;
  basePrice: string;
  category: string;
  isActive: boolean;
  estimatedDuration: string | null;
  imageUrl: string | null;
  customFormFields: any;
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  clientId: string;
  status: string;
  totalAmount: string | null;
  notes: string | null;
  items: any[];
  photos: any[];
  createdAt: string;
  updatedAt: string;
  services?: Service[];
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  role: "client" | "client_professionnel";
  companyName?: string;
  siret?: string;
  tvaNumber?: string;
  companyAddress?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SupportContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const authApi = {
  register: (data: RegisterData) =>
    apiCall<{ message: string; userId: string }>("/api/register", {
      method: "POST",
      body: data,
    }),

  login: (data: LoginData) =>
    apiCall<{ user: UserProfile }>("/api/login", {
      method: "POST",
      body: data,
    }),

  logout: () =>
    apiCall("/api/logout", { method: "POST" }),

  getUser: () =>
    apiCall<UserProfile>("/api/auth/user"),

  updateUser: (data: Partial<UserProfile>) =>
    apiCall<UserProfile>("/api/auth/user", {
      method: "PUT",
      body: data,
    }),

  forgotPassword: (email: string) =>
    apiCall("/api/auth/forgot-password", {
      method: "POST",
      body: { email },
    }),
};

export const servicesApi = {
  getAll: () => apiCall<Service[]>("/api/services"),
};

export const quotesApi = {
  getAll: () => apiCall<Quote[]>("/api/quotes"),

  create: (data: any) =>
    apiCall<Quote>("/api/quotes", {
      method: "POST",
      body: data,
    }),
};

export const uploadApi = {
  upload: async (uri: string, filename: string, type: string) => {
    const formData = new FormData();
    formData.append("media", {
      uri,
      name: filename,
      type,
    } as any);

    return apiCall<{ objectPath: string }>("/api/upload", {
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },
};

export const supportApi = {
  contact: (data: SupportContactData) =>
    apiCall<{ success: boolean; message: string }>("/api/support/contact", {
      method: "POST",
      body: data,
    }),
};

export const ocrApi = {
  scan: async (uri: string, filename: string, type: string) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: filename,
      type,
    } as any);

    return apiCall<any>("/api/ocr/scan", {
      method: "POST",
      body: formData,
      isFormData: true,
    });
  },
};
