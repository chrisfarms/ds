using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TravelMarkerController : MonoBehaviour
{
    [SerializeField]
    Transform destinationMarker;

    [SerializeField]
    ParabolicLineController line;

    public void ShowTravelMarkers(Vector3Int startPos, Vector3Int endPos, bool isCube = true)
    {
        Vector3 startPosWorld = MapManager.instance.grid.CellToWorld(
            GridExtensions.CubeToGrid(startPos)
        );
        Vector3 endPosWorld = MapManager.instance.grid.CellToWorld(
            GridExtensions.CubeToGrid(endPos)
        );
        if (isCube)
            ShowTravelMarkers(startPosWorld, endPosWorld);
        else
            ShowTravelMarkers(
                MapManager.instance.grid.CellToWorld(startPos),
                MapManager.instance.grid.CellToWorld(endPos)
            );
    }

    public void ShowTravelMarkers(Vector3 startPos, Vector3 endPos)
    {
        Vector3 startOffset = new Vector3(
            startPos.x,
            MapHeightManager.instance.GetHeightAtPosition(startPos) + 0.01f,
            startPos.z
        );
        Vector3 endOffset = new Vector3(
            endPos.x,
            MapHeightManager.instance.GetHeightAtPosition(endPos) + 0.01f,
            endPos.z
        );
        Vector3 worldEndPos = endOffset;
        line.DrawLine(startOffset, endOffset);
        destinationMarker.position = worldEndPos + (Vector3.up * 0.01f);
        destinationMarker.gameObject.SetActive(true);
    }

    public void HideLine()
    {
        line.HideLine();
    }

    public void DestroyMarker()
    {
        Destroy(gameObject);
    }
}
