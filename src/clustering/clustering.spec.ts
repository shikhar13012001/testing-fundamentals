import { describe, it} from "vitest"
import { loadDataset, cluster } from "./clustering"


describe("clustering", () => {
    it("should load data", async ({ expect }) => {
        // Test code goes here
        const dataSet = loadDataset()
        expect(dataSet).toMatchSnapshot()
    })

    it("should create clusters", async ({ expect }) => {
        // Test code goes here
        const dataSet = [
            {lat:0, lng:0},
            {lat:0, lng:1},
            {lat:10, lng:10},
            {lat:11, lng:11},

        ]
        const clusters = cluster(dataSet,5,1)
        expect(clusters).toEqual({
            "clusters": [
              {
                "data": [
                  {
                    "lat": 0,
                    "lng": 0,
                  },
                  {
                    "lat": 0,
                    "lng": 1,
                  },
                ],
                "latMax": 0,
                "latMin": 0,
                "lngMax": 1,
                "lngMin": 0,
              },
              {
                "data": [
                  {
                    "lat": 10,
                    "lng": 10,
                  },
                  {
                    "lat": 11,
                    "lng": 11,
                  },
                ],
                "latMax": 11,
                "latMin": 10,
                "lngMax": 11,
                "lngMin": 10,
              },
            ],
            "latMax": 11,
            "latMin": 0,
            "lngMax": 11,
            "lngMin": 0,
          })
    })

})
