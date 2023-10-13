using System.Collections.Generic;

class BuilderCameraDiorama : IDiorama
{
    public string GetDescription()
    {
        return "Render some tiles being added and removed";
    }

    public List<Dictionary<string, BaseComponentData>> GetStates()
    {
        return new()
        {
            new()
            {

                { "Tile/1", new TileData() { q = 0, r = 0, s = 0, height = 0.01f, color = "#506A95"} },
                { "Tile/2", new TileData() { q = -1, r = 1, s = 0, height = 0.01f, color = "#506A95" } },
                { "Tile/3", new TileData() { q = 0, r = 1, s = -1, height = 0f, color = "#506A95" } },
                { "Tile/4", new TileData() { q = 1, r = 0, s = -1, height = 0f, color = "#506A95" } },
                { "Tile/5", new TileData() { q = 1, r = -1, s = 0, height = 0f, color = "#506A95"} },
                { "Tile/6", new TileData() { q = 0, r = -1, s = 1, height = 0f, color = "#506A95"} },
                { "Tile/7", new TileData() { q = -1, r = 0, s = 1, height = 0f, color = "#1980E0" } },
                { "Factory/7", new FactoryBuildingData() { q = -1, r = 0, s = 1, height = 0.01f, model = "03-04", rotation = -30, color = "#2DAEE0", shadowColor = "#135198" } },
            },
            new()
            {
                { "Tile/7", new TileData() { q = -1, r = 0, s = 1, height = 0f, color = "#1980E0" } },
                { "BuilderCamera", new BuilderCameraData() { q = -1, r = 0, s = 1, height = 0.01f} },
                { "Factory/7", new FactoryBuildingData() { q = -1, r = 0, s = 1, height = 0.01f, model = "03-04", rotation = -30, color = "#2DAEE0", shadowColor = "#135198" } },
            },
        };
    }
}
