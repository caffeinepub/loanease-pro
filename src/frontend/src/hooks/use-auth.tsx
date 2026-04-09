import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    identity,
    loginStatus,
    isInitializing,
    isLoginSuccess,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const handleLogin = () => {
    login();
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    identity,
    isAuthenticated,
    isInitializing,
    isLoginSuccess,
    loginStatus,
    login: handleLogin,
    logout: handleLogout,
  };
}
