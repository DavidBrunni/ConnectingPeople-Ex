const API_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
  "http://localhost:5000";

export type AuthUser = { id: string; name: string; email: string };
export type AuthResponse = { token: string; user: AuthUser };

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
}

export type ProfileUser = {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  interests?: string[];
  upcomingTrips?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export async function getMe(token: string): Promise<ProfileUser> {
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load profile");
  return data;
}

export type PublicUser = { _id: string; name: string; bio?: string; interests?: string[] };

export async function getPublicProfile(userId: string): Promise<PublicUser> {
  const res = await fetch(`${API_URL}/api/users/${userId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load profile");
  return data;
}

export async function updateProfile(
  token: string,
  updates: { name?: string; bio?: string; interests?: string[] }
): Promise<ProfileUser> {
  const res = await fetch(`${API_URL}/api/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Update failed");
  return data;
}

export type Trip = {
  _id: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  description?: string;
  createdBy: { _id: string; name: string; email: string };
  createdAt?: string;
  updatedAt?: string;
};

export async function searchTrips(params: {
  destination?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<Trip[]> {
  const searchParams = new URLSearchParams();
  if (params.destination?.trim()) searchParams.set("destination", params.destination.trim());
  if (params.dateFrom) searchParams.set("dateFrom", params.dateFrom);
  if (params.dateTo) searchParams.set("dateTo", params.dateTo);
  const qs = searchParams.toString();
  const res = await fetch(`${API_URL}/api/trips${qs ? `?${qs}` : ""}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Search failed");
  return data;
}

export async function createTrip(
  token: string,
  data: { destination: string; dateFrom: string; dateTo: string; description?: string }
): Promise<Trip> {
  const res = await fetch(`${API_URL}/api/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Create trip failed");
  return result;
}

export type ConversationItem = {
  partnerId: string;
  partnerName: string;
  lastBody: string;
  lastAt: string;
  lastFromMe: boolean;
};

export type ChatMessage = {
  _id: string;
  sender: { _id: string; name: string };
  receiver: { _id: string; name: string };
  body: string;
  createdAt: string;
};

export async function getConversations(token: string): Promise<ConversationItem[]> {
  const res = await fetch(`${API_URL}/api/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load conversations");
  return data;
}

export async function getMessages(token: string, withUserId: string): Promise<ChatMessage[]> {
  const res = await fetch(`${API_URL}/api/messages?with=${encodeURIComponent(withUserId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load messages");
  return data;
}

export async function sendMessage(
  token: string,
  toUserId: string,
  body: string
): Promise<ChatMessage> {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ to: toUserId, body }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send message");
  return data;
}

export async function getUnreadCount(token: string): Promise<number> {
  const res = await fetch(`${API_URL}/api/messages/unread-count`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to get unread count");
  return data.count ?? 0;
}

export async function markMessagesRead(token: string, withUserId: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/messages/mark-read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ with: withUserId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to mark as read");
}
