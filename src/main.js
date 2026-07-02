import {
  buildModuleUrl,
  Color,
  CzmlDataSource,
  ImageryLayer,
  TileMapServiceImageryProvider,
  Viewer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";

const viewer = new Viewer("cesiumContainer", {
  creditContainer: document.createElement("div"),
  skyBox: false,
  skyAtmosphere: false,
  baseLayer: ImageryLayer.fromProviderAsync(
    TileMapServiceImageryProvider.fromUrl(
      buildModuleUrl("Assets/Textures/NaturalEarthII"),
    ),
  ),
});

viewer.scene.backgroundColor = Color.WHITE;

const czmlSelect = document.getElementById("czmlSelect");
let czmlDataSource;

async function loadCzml(czmlPath) {
  if (czmlDataSource) {
    viewer.dataSources.remove(czmlDataSource, true);
  }

  czmlDataSource = await CzmlDataSource.load(czmlPath);
  viewer.dataSources.add(czmlDataSource);
  viewer.clock.shouldAnimate = true;
}

czmlSelect.addEventListener("change", () => {
  loadCzml(czmlSelect.value);
});

loadCzml(czmlSelect.value);
