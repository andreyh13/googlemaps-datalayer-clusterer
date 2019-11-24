export class Loader {
  public static async getClusterer() {
    if (google && google.maps && google.maps.OverlayView) {
      const module = await import('./clusterer');
      return module.DataLayerClusterer;
    } else {
      // tslint:disable-next-line: no-console
      console.error('Google Maps JavaScript API v3 is not loaded. Cannot initialize MarkerClusterer.');
      return undefined;
    }
  }
}
