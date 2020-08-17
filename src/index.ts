export class Loader {
  public static async getClusterer(): Promise<any> {
    if (google && google.maps && google.maps.OverlayView) {
      const module = await import('./clusterer');
      return module.DataLayerClusterer;
    } else {
      /* eslint-disable */
      console.error('Google Maps JavaScript API v3 is not loaded. Cannot initialize DataLayerClusterer.');
      /* eslint-enable */
      return undefined;
    }
  }
}
