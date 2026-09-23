import { firebaseAuth, logoutFirebase } from "@/const";
import { trpc } from "@/lib/trpc";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath } = options ?? {};
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const utils = trpc.useUtils();

  useEffect(() => onAuthStateChanged(firebaseAuth, user => {
    setFirebaseUser(user);
    setAuthLoading(false);
  }), []);

  const meQuery = trpc.auth.me.useQuery(undefined, {
    enabled: Boolean(firebaseUser),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logout = useCallback(async () => {
    await logoutFirebase();
    utils.auth.me.setData(undefined, null);
    await utils.auth.me.invalidate();
  }, [utils]);

  useEffect(() => {
    if (!redirectOnUnauthenticated || authLoading || meQuery.isLoading || firebaseUser) return;
    if (typeof window === "undefined") return;
    if (redirectPath && window.location.pathname === redirectPath) return;
    if (redirectPath) window.location.href = redirectPath;
  }, [authLoading, firebaseUser, meQuery.isLoading, redirectOnUnauthenticated, redirectPath]);

  return {
    user: meQuery.data ?? null,
    loading: authLoading || meQuery.isLoading,
    error: meQuery.error ?? null,
    isAuthenticated: Boolean(firebaseUser && meQuery.data),
    refresh: () => meQuery.refetch(),
    logout,
  };
}
