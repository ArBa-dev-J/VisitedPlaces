const test = [
  {
    fieldname: "image",
    originalname: "Screenshot (6).png",
    encoding: "7bit",
    mimetype: "image/png",
    path: "images/1793802163524.png",
    destination: "images/",
    filename: "1793802163524.png",
    size: 3238795,
  },
  {
    fieldname: "image",
    originalname: "Screenshot (7).png",
    encoding: "7bit",
    mimetype: "image/png",
    path: "images/1793802163604.png",
    destination: "images/",
    filename: "1793802163604.png",
    size: 444774,
  },
];

function fromArrObjsToSinglObj(array) {
  return {
    hash: array.path,
    path: file.path,
  };
}

// console.log(fromArrObjsToSinglObj(test));

export default fromArrObjsToSinglObj;
