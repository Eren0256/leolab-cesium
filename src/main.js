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

async function loadCzmlOptions() {
  const response = await fetch("/czml/manifest.json");
  if (!response.ok) {
    throw new Error("Failed to load CZML manifest");
  }

  const czmlFiles = await response.json();
  for (const czmlFile of czmlFiles) {
    const option = document.createElement("option");
    option.value = czmlFile.path;
    option.textContent = czmlFile.name;
    czmlSelect.appendChild(option);
  }

  if (czmlFiles.length > 0) {
    await loadCzml(czmlSelect.value);
  }
}

czmlSelect.addEventListener("change", () => {
  loadCzml(czmlSelect.value);
});

loadCzmlOptions();
