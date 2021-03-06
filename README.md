# DataLayer Clusterer for Google Maps JavaScript API v3

[![npm version](http://img.shields.io/npm/v/googlemaps-datalayer-clusterer.svg?style=flat)](https://npmjs.org/package/googlemaps-datalayer-clusterer "View this project on npm") ![GitHub release (latest by date)](https://img.shields.io/github/v/release/andreyh13/googlemaps-datalayer-clusterer) ![license](https://img.shields.io/github/license/andreyh13/googlemaps-datalayer-clusterer)


This is fast data layer features clustering library. It's working on top of the Data Layer of Google Maps JavaScript API v3 and maintain the same public methods as a standard [Data layer](https://developers.google.com/maps/documentation/javascript/reference/data).

## Getting Started

The Data Layer Clusterer library can be served from the firebase host. Add the following script tag in your html file

    <script src="https://maps-tools-242a6.firebaseapp.com/clusterer/datalayer/datalayerclusterer.js">
    </script>

Please note that Data Layer Clusterer implements a `google.maps.OverlayView` interface, so it must be initialized after the Google Maps JavaScript API v3 is fully loaded.

Typically Google Maps JavaScript API is loaded in asynchronous way as specified in the official documentation

    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]]&callback=initMap">
    </script>

That means we must include clusterer initialization code inside `initMap()` callback function after map object initialization.

E.g.

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center:  {lat: 41.3850639, lng: 2.1734035}
      });

      DataLayerClusterer.getClusterer().then(Clusterer => {
        if (Clusterer) {
          const clusterer = new Clusterer.Builder(map)
              .withMaxZoom(20)
              .build();
          clusterer.loadGeoJson("https://maps-tools-242a6.firebaseapp.com/clusterer/demos/samplegeojson.json");
        }
      });
    }

Note that clusterer is loaded asynchronously, so the logic should be implemented once `MarkerClusterer.getClusterer()` promise is resolved.

### Setting up clusterer

In order to set up a clusterer you should call `DataLayerClusterer.getClusterer()` method that returns a promise. Once resolved the promise you will have a Clusterer class that should be used to create an instance of clusterer object.

Code snippet is the following

    DataLayerClusterer.getClusterer().then(Clusterer => {
      if (Clusterer) {
        // TODO: create instance of clusterer
      }
    });

### Create instance of clusterer

In order to create instance of clusterer you must call Builder, the Builder accepts an instance of `google.maps.Map` as a constructor parameter and allows call several chained functions to establish parameters of clusterer.

    const clusterer = new Clusterer.Builder(map)
        .withMaxZoom(20)
        .build();

### Public methods available for chaining in Builder object

    withGridSize(gridSize: number)

    withMinClusterSize(minClusterSize: number)

    withMaxZoom(maxZoom: number)

    withClassName(className: string)

    withStyles(styles: IStyle[])

    withImagePath(imagePath: string)

    withImageExtension(imageExtension: string)

    withZoomOnClick(zoomOnClick: boolean)

    withAverageCenter(averageCenter: boolean)

#### Interface IStyle

This interface is used to style the cluster's icons. There is default implementation of styles, but you can override it applying array of styles in Builder object

    interface IStyle {
      url: string;
      height: number;
      width: number;
      textColor?: string;
      anchor?: number[] | null;
      textSize?: number;
      backgroundPosition?: string;
    }

### Loading features to clusterer

In order to add features to the clusterer you should use `addGeoJson()` or `loadGeoJson()` methods. These methods accept the same parameters as corresponding methods of the data layer in Google Maps JavaScript API v3.

    const features = clusterer.addGeoJson(jsonObject);

    clusterer.loadGeoJson(urlJSON, (features) => {
      // Do something with loaded features here
    });

### Public methods available on clusterer object

    setVisible(v: boolean): void;
    getTotalClusters(): number;
    getClustererBounds(): google.maps.LatLngBounds;
    getFeaturesBounds(): google.maps.LatLngBounds;
    getExtendedBounds(bounds: google.maps.LatLngBounds): google.maps.LatLngBounds;
    getFeatureDimensions(feature: google.maps.Data.Feature): IDimension
    addFeatureOrAlternativeToDataLayer(feature: google.maps.Data.Feature): void;
    removeFeatureAndAlternativeFromDataLayer(feature: google.maps.Data.Feature): void;
    redraw(): void;
    destroy(): void;

### Public methods that override google.maps.Data public methods

    add(feature: google.maps.Data.Feature | google.maps.Data.FeatureOptions): google.maps.Data.Feature;
    addGeoJson(geoJson: object, options?: google.maps.Data.GeoJsonOptions): google.maps.Data.Feature[];
    contains(feature: google.maps.Data.Feature): boolean;
    forEach(callback: (feature: google.maps.Data.Feature) => void): void;
    getControlPosition(): google.maps.ControlPosition;
    getControls(): google.maps.DrawingMode[];
    getDrawingMode(): google.maps.DrawingMode | null;
    getFeatureById(id: string | number): google.maps.Data.Feature | null;
    getStyle(): google.maps.Data.StylingFunction | google.maps.Data.StyleOptions;
    loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions, callback?: (features: google.maps.Data.Feature[]) => void): void;
    overrideStyle(feature: google.maps.Data.Feature, style: google.maps.Data.StyleOptions): void;
    remove(feature: google.maps.Data.Feature): void;
    revertStyle(feature?: google.maps.Data.Feature | undefined): void;
    setControlPosition(controlPosition: google.maps.ControlPosition): void;
    setControls(controls: google.maps.DrawingMode[] | null): void;
    setDrawingMode(drawingMode: google.maps.DrawingMode | null): void;
    setStyle(style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions): void;
    toGeoJson(callback: (json: object) => void): void;

## Demo

The live demo is available at [https://maps-tools-242a6.firebaseapp.com/clusterer/demos/datalayerclusterer.html](https://maps-tools-242a6.firebaseapp.com/clusterer/demos/datalayerclusterer.html)

Stackblitz samples:

- [JavaScript](https://stackblitz.com/edit/js-avzfed)
- [Angular](https://stackblitz.com/edit/angular-ivy-wkmgrz)
- [React](https://stackblitz.com/edit/react-ts-vjmk8w)

## Licence

The source code of this library is licensed under the MIT License.
