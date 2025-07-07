function scatterCoords(lat, lng) {
    const offset = () => (Math.random() - 0.5) * 0.10; 
    return {
      lat: lat + offset(),
      lng: lng + offset(),
    };
  }
  
  export const locations = [
    { id: 1, name: "Person 1", ...scatterCoords(23.3615, 85.3380) },
    { id: 2, name: "Person 2", ...scatterCoords(23.3441, 85.3096) },
    { id: 3, name: "Person 3", ...scatterCoords(23.3500, 85.3333) },
    { id: 4, name: "Person 4", ...scatterCoords(23.3650, 85.3200) },
    { id: 5, name: "Person 5", ...scatterCoords(23.3555, 85.3150) },
    { id: 6, name: "Person 6", ...scatterCoords(23.3400, 85.3100) },
    { id: 7, name: "Person 7", ...scatterCoords(23.3450, 85.3350) },
    { id: 8, name: "Person 8", ...scatterCoords(23.3500, 85.3250) },
    { id: 9, name: "Person 9", ...scatterCoords(23.3550, 85.3400) },
    { id: 10, name: "Person 10", ...scatterCoords(23.3425, 85.3205) },
    { id: 11, name: "Person 11", ...scatterCoords(23.3600, 85.3300) },
    { id: 12, name: "Person 12", ...scatterCoords(23.3470, 85.3180) },
    { id: 13, name: "Person 13", ...scatterCoords(23.3520, 85.3400) },
    { id: 14, name: "Person 14", ...scatterCoords(23.3440, 85.3370) },
    { id: 15, name: "Person 15", ...scatterCoords(23.3625, 85.3250) },
    { id: 16, name: "Person 16", ...scatterCoords(23.3415, 85.3360) },
    { id: 17, name: "Person 17", ...scatterCoords(23.3490, 85.3190) },
    { id: 18, name: "Person 18", ...scatterCoords(23.3510, 85.3120) },
    { id: 19, name: "Person 19", ...scatterCoords(23.3485, 85.3220) },
    { id: 20, name: "Person 20", ...scatterCoords(23.3430, 85.3280) }
  ];
  