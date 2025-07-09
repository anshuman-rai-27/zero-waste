function scatterCoords(lat, lng){
  const offset = () => (Math.random() - 0.5) * 0.01;
  return {
    lat: lat + offset(),
    lng: lng + offset()
  }
}

export const locations1 = [
  { id: 1, name: "Person 1", ...scatterCoords(23.3451, 85.3098) },
  { id: 2, name: "Person 2", ...scatterCoords(23.3445, 85.3103) },
  { id: 3, name: "Person 3", ...scatterCoords(23.3449, 85.3087) },
  { id: 4, name: "Person 4", ...scatterCoords(23.3438, 85.3101) },
  { id: 5, name: "Person 5", ...scatterCoords(23.3452, 85.3094) },
  { id: 6, name: "Person 6", ...scatterCoords(23.3440, 85.3092) },
  { id: 7, name: "Person 7", ...scatterCoords(23.3447, 85.3106) },
  { id: 8, name: "Person 8", ...scatterCoords(23.3439, 85.3089) },
  { id: 9, name: "Person 9", ...scatterCoords(23.3453, 85.3090) },
  { id: 10, name: "Person 10", ...scatterCoords(23.3442, 85.3102) },
  { id: 11, name: "Person 11", ...scatterCoords(23.3446, 85.3091) },
  { id: 12, name: "Person 12", ...scatterCoords(23.3437, 85.3093) },
  { id: 13, name: "Person 13", ...scatterCoords(23.3443, 85.3100) },
  { id: 14, name: "Person 14", ...scatterCoords(23.3448, 85.3095) },
  { id: 15, name: "Person 15", ...scatterCoords(23.3450, 85.3104) },
  { id: 16, name: "Person 16", ...scatterCoords(23.3436, 85.3098) },
  { id: 17, name: "Person 17", ...scatterCoords(23.3439, 85.3105) },
  { id: 18, name: "Person 18", ...scatterCoords(23.3441, 85.3088) },
  { id: 19, name: "Person 19", ...scatterCoords(23.3454, 85.3092) },
  { id: 20, name: "Person 20", ...scatterCoords(23.3444, 85.3103) }
];


export const locations2 = [
  { id: 21, name: "Person 21", ...scatterCoords(23.3525, 85.3203) },
  { id: 22, name: "Person 22", ...scatterCoords(23.3518, 85.3195) },
  { id: 23, name: "Person 23", ...scatterCoords(23.3521, 85.3192) },
  { id: 24, name: "Person 24", ...scatterCoords(23.3515, 85.3206) },
  { id: 25, name: "Person 25", ...scatterCoords(23.3523, 85.3201) },
  { id: 26, name: "Person 26", ...scatterCoords(23.3517, 85.3210) },
  { id: 27, name: "Person 27", ...scatterCoords(23.3519, 85.3204) },
  { id: 28, name: "Person 28", ...scatterCoords(23.3522, 85.3197) },
  { id: 29, name: "Person 29", ...scatterCoords(23.3526, 85.3205) },
  { id: 30, name: "Person 30", ...scatterCoords(23.3516, 85.3199) },
  { id: 31, name: "Person 31", ...scatterCoords(23.3524, 85.3196) },
  { id: 32, name: "Person 32", ...scatterCoords(23.3513, 85.3203) },
  { id: 33, name: "Person 33", ...scatterCoords(23.3520, 85.3194) },
  { id: 34, name: "Person 34", ...scatterCoords(23.3514, 85.3208) },
  { id: 35, name: "Person 35", ...scatterCoords(23.3527, 85.3202) },
];

export const locations3 = [
  { id: 36, name: "Person 36", ...scatterCoords(23.3615, 85.3350) },
  { id: 37, name: "Person 37", ...scatterCoords(23.3605, 85.3364) },
  { id: 38, name: "Person 38", ...scatterCoords(23.3590, 85.3359) },
  { id: 39, name: "Person 39", ...scatterCoords(23.3585, 85.3343) },
  { id: 40, name: "Person 40", ...scatterCoords(23.3595, 85.3329) },
  { id: 41, name: "Person 41", ...scatterCoords(23.3610, 85.3329) },
  { id: 42, name: "Person 42", ...scatterCoords(23.3620, 85.3343) },
  { id: 43, name: "Person 43", ...scatterCoords(23.3620, 85.3357) },
  { id: 44, name: "Person 44", ...scatterCoords(23.3610, 85.3367) },
  { id: 45, name: "Person 45", ...scatterCoords(23.3598, 85.3365) },
];


