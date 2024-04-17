import ds from 'downstream';

const billboardName = "-E2-";
const billboardImage = "https://i.imgur.com/wuhifWr.png";

export default async function update({ selected, world, player }) {
    const billboardBuilding = (world?.buildings || []).find(
        (b) => b.kind?.name?.value === billboardName,
    );
    const mapObj = [];
    if(billboardBuilding)
    {
        mapObj.push(
            {
                type: "building",
                key: "image",
                id: `${billboardBuilding.id}`,
                value: `${billboardImage}`,
            }
        );
    }
    return {
        version: 1,
        map: mapObj,
        components: [
            {
                type: 'building',
                id: 'e2-billboard',
                content: [
                    {
                        id: 'default',
                        type: 'inline',
                        html: 'E'
                    }
                ],
            },
        ],
    };
}