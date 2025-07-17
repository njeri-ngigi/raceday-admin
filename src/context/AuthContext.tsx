import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation, useRefreshTokenMutation } from "../services/api";
import { TokenPayload } from "./types";

type AuthContextType = {
  isAuthLoading?: boolean;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
};

function getTimeLeftToRefresh(expiryTimeInSeconds: number): number {
  const thousandMilliSeconds = 1000;
  const sixtySeconds = 60;
  const fiveMinutes = 5;

  // convert expiry to milliseconds
  const expiresAt = expiryTimeInSeconds * thousandMilliSeconds;
  // buffer to refresh the token 5 minutes before it expires
  const buffer = fiveMinutes * sixtySeconds * thousandMilliSeconds;
  const now = Date.now();
  return expiresAt - now - buffer;
}

function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const expireAt = decoded?.exp;
    const nowInSeconds = Date.now() / 1000;
    return !!expireAt && expireAt > nowInSeconds;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimer = useRef<number | null>(null);
  const [refresh] = useRefreshTokenMutation();
  const [logoutFromServer] = useLogoutMutation();
  const navigate = useNavigate();

  const clearToken = useCallback(() => {
    setTokenState(null);
    setIsLoading(false);
    if (refreshTimer.current) {
      clearTimeout(refreshTimer.current);
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    navigate("/login");
  }, [navigate]);

  const logoutFromSession = useCallback(async () => {
    logoutFromServer()
      .unwrap()
      .finally(() => {
        logout();
      });
  }, [logout]);

  /**
   * Schedule a token refresh based on the expiry time of the token.
   * If the token is already expired, logout from the session.
   */
  const scheduleRefresh = useCallback(
    (token: string) => {
      const decoded = jwtDecode<TokenPayload>(token);
      if (!decoded || !decoded.exp) {
        logout();
      }
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
      const timeLeftToRefresh = getTimeLeftToRefresh(decoded.exp);
      if (timeLeftToRefresh > 0) {
        refreshTimer.current = window.setTimeout(() => {
          refresh()
            .unwrap()
            .then((res) => {
              setTokenState(res.accessToken);
              setIsLoading(false);
              scheduleRefresh(res.accessToken);
            })
            .catch(() => {
              logout(); // invalid refresh cookie or session expired
            });
        }, timeLeftToRefresh);
      } else {
        logoutFromSession(); // token already expired
      }
    },
    [refresh]
  );

  const setToken = useCallback(
    (token: string | null) => {
      setTokenState(token);
      setIsLoading(false);
      if (token) {
        scheduleRefresh(token);
        navigate("/", { replace: true });
      } else {
        logout();
      }
    },
    [scheduleRefresh]
  );

  /**
   * On initial load, send a request to refresh the token
   * If the request is successful, we had a valid refresh token, set the new token in state
   * If the request fails, we don't have a valid refresh token, logout
   */
  useEffect(() => {
    refresh()
      .unwrap()
      .then((res) => {
        setToken(res.accessToken);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthLoading: isLoading,
        isAuthenticated: isTokenValid(token || ""),
        setToken,
        logout: logoutFromSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
