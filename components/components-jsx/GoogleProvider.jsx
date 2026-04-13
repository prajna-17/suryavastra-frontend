"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }) {
  return (
    <GoogleOAuthProvider clientId="834894232655-0vg43pr9shvi21kia3vuighti8ifajg0.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
