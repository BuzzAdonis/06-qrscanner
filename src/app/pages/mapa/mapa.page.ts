import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var mapboxgl: any;
declare var coordinates: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  latitud:number;
  logitud:number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    let geo:any = this.route.snapshot.paramMap.get('geo');
    geo = geo.substring(4);
    geo = geo.split(',');
    this.latitud = Number(geo[0]);
    this.logitud = Number(geo[1]);
    console.log(this.latitud,this.logitud);
  }
  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVnYW1hbmRldiIsImEiOiJjbDVwdDR3emkwNGVyM2NtZWplNTJqYW84In0.ElL4P3xrBmeIN7ndtrL0Nw';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.logitud, this.latitud],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
      });

      map.on('load', () => {
        map.resize();

         new mapboxgl.Marker()
          .setLngLat([this.logitud, this.latitud])
          .addTo(map);
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
  }

}
