// ✅ utils/ablyClient.js
import * as Ably from "ably";

let ablyRealtime = null;

export const initializeAblyClient = async (userToken) => {
  console.log(userToken);
  if (ablyRealtime) return ablyRealtime;

  try {
    ablyRealtime = new Ably.Realtime({
      authUrl: `${import.meta.env.VITE_BACKEND_DOMAIN}/api/ably/token`,
      authHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return ablyRealtime;
  } catch (err) {
    console.error("Ably initialization error:", err);
    return null;
  }
};

export const getAblyInstance = () => ablyRealtime;