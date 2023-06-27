using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapElementController : MonoBehaviour
{
    [SerializeField]
    protected Transform iconParent;

    [SerializeField]
    protected GameObject iconPrefab;

    [SerializeField]
    private bool createIcon = true;

    protected IconController _icon;
    protected Vector3 _currentPosition;

    public void Setup(Vector3Int cell, Transform parent = null)
    {
        Vector3 pos = MapManager.instance.grid.CellToWorld(GridExtensions.CubeToGrid(cell));
        float height = MapHeightManager.instance.GetHeightAtPosition(pos);
        if (parent != null)
            height = parent.position.y;
        _currentPosition = pos;
        _currentPosition = new Vector3(_currentPosition.x, height, _currentPosition.z);
        transform.position = _currentPosition;
        if (parent != null)
        {
            transform.SetParent(parent, true);
        }
        if (createIcon)
            _icon = MapElementManager.instance.CreateIcon(iconParent, iconPrefab);
    }

    public void DestroyMapElement()
    {
        if (createIcon)
            _icon.DestroyIcon();
        Destroy(gameObject);
    }
}
