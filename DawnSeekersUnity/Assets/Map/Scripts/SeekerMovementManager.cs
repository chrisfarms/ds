using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;
using Cog;

public class SeekerMovementManager : MonoBehaviour
{
    public Action ClearTravelMarkers;
    public static SeekerMovementManager instance;

    [SerializeField]
    private GameObject travelMarkerPrefab,
        greenHighlightPrefab,
        orangeHighlightPrefab;

    private List<KeyValuePair<Vector3Int, TravelMarkerController>> _path; //cell positions in Cube Coordinates;
    private Dictionary<Vector3Int, GameObject> spawnedValidCellHighlights,
        spawnedPathHighlights;
    private bool isMoving;

    private void Awake()
    {
        instance = this;
        spawnedValidCellHighlights = new Dictionary<Vector3Int, GameObject>();
        spawnedPathHighlights = new Dictionary<Vector3Int, GameObject>();
    }

    private void Start()
    {
        // Cog.PluginController.Instance.EventStateUpdated += OnStateUpdated;

        // NOTE: Not using the global UI state for path selection as it needs more thought due
        //       to problems where other player's movement would cause state updates
        //       and clicking on the same tile wouldn't change the state so Unity didn't get a state update
        MapInteractionManager.instance.EventTileLeftClick += OnTileLeftClick;
        MapInteractionManager.instance.EventTileRightClick += OnTileRightClick;
    }

    private void OnDestroy()
    {
        // Cog.PluginController.Instance.EventStateUpdated -= OnStateUpdated;

        MapInteractionManager.instance.EventTileLeftClick -= OnTileLeftClick;
        MapInteractionManager.instance.EventTileRightClick -= OnTileRightClick;
    }

    private void Update()
    {
        if (isMoving)
        {
            Vector3Int cubeMousePos = GridExtensions.GridToCube(
                MapInteractionManager.CurrentMouseCell
            );
            if (MapInteractionManager.instance.IsDiscoveredTile(cubeMousePos))
            {
                if (
                    !spawnedPathHighlights.ContainsKey(cubeMousePos)
                    && TileHelper
                        .GetTileNeighbours(_path[_path.Count - 1].Key)
                        .Contains(cubeMousePos)
                )
                {
                    TooltipManager.instance.ShowTooltip(
                        "Right-click to <b>Move</b>\nLeft-click to <b>Add</b>"
                    );
                }
                else if (_path[_path.Count - 1].Key == cubeMousePos)
                {
                    TooltipManager.instance.ShowTooltip(
                        "Right-click to <b>Move</b>\nLeft-click to <b>Undo</b>"
                    );
                }
            }
        }
    }

    private void OnTileLeftClick(Vector3Int cellCubePos)
    {
        if (!isMoving)
            return;

        if (!isValidTile(cellCubePos))
            return;

        if (_path.Count == 0 || _path[_path.Count - 1].Key != cellCubePos)
        {
            AddCellToPath(cellCubePos);
            HighlightAvailableSpaces();
        }
        else if (_path.Count > 1)
        {
            Destroy(spawnedPathHighlights[cellCubePos]);
            spawnedPathHighlights.Remove(cellCubePos);
            RemoveCellFromPath(cellCubePos);
            HighlightAvailableSpaces();
        }
        else
        {
            HideHighlights();
            HidePathHighlights();
            isMoving = false;
        }
    }

    private void OnTileRightClick(Vector3Int cellCubePos)
    {
        if (isMoving)
        {
            ClosePath(cellCubePos);
        }
        else
        {
#if UNITY_EDITOR
            PluginController.Instance.ScoutTile(cellCubePos);
#endif
        }
    }

    private bool isValidTile(Vector3Int cellCubePos)
    {
        var tile = MapInteractionManager.instance.GetTile(cellCubePos);

        if (tile == null)
            return false;

        return tile.Biome != 0; // 0 = UNDISCOVERED
    }

    // -- This code was driven by the global UI state which was causing some problems
    // private void OnStateUpdated(State state)
    // {
    //     if (state.UI.Selection.Tiles == null || state.UI.Selection.Tiles.Count == 0)
    //         return;

    //     var tile = state.UI.Selection.Tiles.ToList()[0];
    //     var cellCubePos = TileHelper.GetTilePosCube(tile);

    //     if (!isMoving)
    //         return;

    //     if (_path.Count == 0 || _path[_path.Count - 1].Key != cellCubePos)
    //     {
    //         AddCellToPath(cellCubePos);
    //         HighlightAvailableSpaces();
    //     }
    //     else if (_path.Count > 1)
    //     {
    //         Destroy(spawnedPathHighlights[cellCubePos]);
    //         spawnedPathHighlights.Remove(cellCubePos);
    //         RemoveCellFromPath(cellCubePos);
    //         HighlightAvailableSpaces();
    //     }
    //     else
    //     {
    //         HideHighlights();
    //         HidePathHighlights();
    //         isMoving = false;
    //     }
    // }

    public void ActivateMovementMode()
    {
        if (isMoving)
            return;
        isMoving = true;
        _path = new List<KeyValuePair<Vector3Int, TravelMarkerController>>();
        AddCellToPath(GridExtensions.GridToCube(MapInteractionManager.CurrentSelectedCell));
        HighlightAvailableSpaces();
    }

    public void HighlightAvailableSpaces()
    {
        HideHighlights();

        foreach (Vector3Int space in TileHelper.GetTileNeighbours(_path[_path.Count - 1].Key))
        {
            if (
                !spawnedPathHighlights.ContainsKey(space)
                && MapInteractionManager.instance.IsDiscoveredTile(space)
            )
            {
                GameObject highlight = Instantiate(greenHighlightPrefab);
                highlight.transform.position = MapManager.instance.grid.CellToWorld(
                    GridExtensions.CubeToGrid(space)
                );
                spawnedValidCellHighlights.Add(space, highlight);
            }
        }
    }

    private void HideHighlights()
    {
        foreach (KeyValuePair<Vector3Int, GameObject> go in spawnedValidCellHighlights)
        {
            Destroy(go.Value);
        }
        spawnedValidCellHighlights = new Dictionary<Vector3Int, GameObject>();
    }

    private void HidePathHighlights()
    {
        foreach (KeyValuePair<Vector3Int, GameObject> go in spawnedPathHighlights)
        {
            Destroy(go.Value);
        }
        spawnedPathHighlights = new Dictionary<Vector3Int, GameObject>();
    }

    private void AddCellToPath(Vector3Int cellCubePos)
    {
        bool validPosition =
            _path.Count == 0
            || TileHelper.GetTileNeighbours(_path[_path.Count - 1].Key).Contains(cellCubePos);
        if (!_path.Any(p => p.Key == cellCubePos) && validPosition)
        {
            bool addMarker = _path.Count > 0;
            TravelMarkerController travelMarkerController = null;
            if (addMarker)
                travelMarkerController = Instantiate(travelMarkerPrefab)
                    .GetComponent<TravelMarkerController>();
            _path.Add(
                new KeyValuePair<Vector3Int, TravelMarkerController>(
                    cellCubePos,
                    travelMarkerController
                )
            );
            if (addMarker)
                travelMarkerController.ShowTravelMarkers(
                    _path[_path.Count - 2].Key,
                    _path[_path.Count - 1].Key
                );

            GameObject highlight = Instantiate(orangeHighlightPrefab);
            highlight.transform.position = MapManager.instance.grid.CellToWorld(
                GridExtensions.CubeToGrid(cellCubePos)
            );
            spawnedPathHighlights.Add(cellCubePos, highlight);
        }
    }

    private void RemoveCellFromPath(Vector3Int cellCubePos)
    {
        _path.FirstOrDefault(p => p.Key == cellCubePos).Value.HideLine();
        _path.Remove(_path.FirstOrDefault(p => p.Key == cellCubePos));
    }

    private void ClosePath(Vector3Int cellCubePos)
    {
        HideHighlights();
        AddCellToPath(cellCubePos);
        HidePathHighlights();
        isMoving = false;
        StartCoroutine(TracePathCR());
    }

    IEnumerator TracePathCR()
    {
        for (int i = 1; i < _path.Count; i++)
        {
            PluginController.Instance.MoveSeeker(SeekerManager.Instance.Seeker, _path[i].Key);
            yield return new WaitForSeconds(3.5f);
            if (_path[i].Value != null)
                _path[i].Value.HideLine();
        }
    }
}