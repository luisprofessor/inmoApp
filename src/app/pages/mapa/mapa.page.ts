import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var mapboxgl:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  constructor() { }
  //Se ejecuta después de que se inicialice el componente
  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVpczE5NzMiLCJhIjoiY2tsMWg2OTV6MDMyMjMybXJlcXhyOTY1MyJ9.YN_7kOCUnfTsbUbInFTUgQ';
    /*const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
   });*/


   const map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-66.31252659628312,-33.18440094418022],
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    container: 'map',
    antialias: true
    });

    map.on('load', () => {
      map.resize();
      // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;
       
      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
      {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
       
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
          15,
          0,
          15.05,
      ['get', 'height']
      ],
      'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.6
      }
      },
      labelLayerId
      );
      });

      const marker = new mapboxgl.Marker()
      .setLngLat([-66.3122395, -33.1843936])
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Inmobiliaria La Punta</h1>"))
      .addTo(map);

  }
  

  ngOnInit() {
  }

}
