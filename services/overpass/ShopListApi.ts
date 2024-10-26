import axios from "axios";
import { API_VALUE } from "@/constants/appConstants";

type LocationType = {
  latitude: number | null;
  longitude: number | null;
};

type MapList = {
  shopName: string;
  shopLocationName: string;
  distance: number; // 数値型の距離
};

//haversine fomula（半正矢関数 ※単位はmとする
const haversineDistance = (
  location1: LocationType,
  location2: LocationType,
): number => {
  const R = 6371; // 地球の半径（キロメートル）

  if (
    location1.latitude == null ||
    location1.longitude == null ||
    location2.latitude == null ||
    location2.longitude == null
  ) {
    return 0;
  }

  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const dLat = toRadians(location2.latitude - location1.latitude);
  const dLon = toRadians(location2.longitude - location1.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(location1.latitude)) *
      Math.cos(toRadians(location2.latitude)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c * 1000;
};

const getShopList = async (
  searchString: string,
  currentLocation: LocationType,
): Promise<MapList[]> => {
  const searchRadius: number = API_VALUE.SHOPLIST_API.SEARCH_RADIUS;
  const query = `
  [out:json];
  (
    node["shop"]["name"~"${searchString}"](around:${searchRadius.toString()}, ${
      currentLocation.latitude
    }, ${currentLocation.longitude});
    node["amenity"]["name"~"${searchString}"](around:${searchRadius.toString()}, ${
      currentLocation.latitude
    }, ${currentLocation.longitude});
  );
  out body;
  `;

  try {
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `data=${encodeURIComponent(query)}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const shopList: MapList[] = response.data.elements.map((element: any) => {
      const shopName = element.tags?.name || "Unnamed Shop";
      const shopLocationName =
        element.tags?.branch || element.tags?.["addr:full"];
      const shopLocation: LocationType = {
        latitude: element.lat,
        longitude: element.lon,
      };
      const distance = parseFloat(
        haversineDistance(currentLocation, shopLocation).toFixed(0),
      );

      return {
        shopName,
        shopLocationName,
        distance, // 数値型で距離を保存
      };
    });

    // 数値型の距離でソート
    shopList.sort((a, b) => a.distance - b.distance);

    return shopList;
  } catch (error) {
    console.error("Error fetching shops:", error);
    return [];
  }
};

export default { getShopList };
