import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App and Auth if they haven't been initialized already
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// We request read access to Google Slides Presentations
provider.addScope("https://www.googleapis.com/auth/presentations.readonly");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess: (user: User, token: string) => void,
  onAuthFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess(user, cachedAccessToken);
      } else {
        // If we don't have token in memory, we need user to sign in to fetch Google APIs
        onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure();
    }
  });
};

// Start Google sign-in popup flow
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  if (isSigningIn) return null;
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to retrieve Google OAuth access token.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Firebase Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Sign out from Firebase and clear the in-memory access token
export const googleSignOut = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Helper to extract the 44-character presentation ID from a clean ID or Google Docs URL
export function extractPresentationId(urlOrId: string): string {
  const trimmed = urlOrId.trim();
  const regExp = /\/presentation\/d\/([a-zA-Z0-9-_]+)/;
  const match = trimmed.match(regExp);
  return match ? match[1] : trimmed;
}

export interface SlidePages {
  objectId: string;
  thumbnailUrl: string;
}

// Fetch presentation structure and resolve all slide images in parallel
export const fetchPresentationSlides = async (
  presentationIdOrUrl: string, 
  token: string
): Promise<SlidePages[]> => {
  const presentationId = extractPresentationId(presentationIdOrUrl);
  if (!presentationId) {
    throw new Error("No valid Presentation ID detected.");
  }

  // 1. Fetch Google Presentations metadata to get slide objectIds
  const url = `https://slides.googleapis.com/v1/presentations/${presentationId}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const message = errorBody?.error?.message || `Failed to fetch presentation (HTTP ${res.status})`;
    throw new Error(message);
  }

  const data = await res.json();
  const slides = data.slides || [];

  if (slides.length === 0) {
    return [];
  }

  // 2. Resolve every slide thumbnail image in parallel for speed & flow
  const slidePromises = slides.map(async (slide: any) => {
    const thumbUrl = `https://slides.googleapis.com/v1/presentations/${presentationId}/pages/${slide.objectId}/thumbnail`;
    const thumbRes = await fetch(thumbUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!thumbRes.ok) {
      return { 
        objectId: slide.objectId, 
        thumbnailUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop" // fallback grid
      };
    }
    const thumbData = await thumbRes.json();
    return {
      objectId: slide.objectId,
      thumbnailUrl: thumbData.contentUrl
    };
  });

  return Promise.all(slidePromises);
};
