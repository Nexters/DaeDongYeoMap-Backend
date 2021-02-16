export const createSticker = {
  input: `mutation {
    createSticker(createStickerInput: {
      place_id: "27314276"
      place_name: "소년소고기"
      x: 127.06707418096332
      y: 37.56272196299047
      sticker_index: 3
      sweet_percent: 50
    }){
      sticker_index
      sweet_percent
      is_used
      spot(populate:true){
        place_id
        place_name
        category_name
        category_group_code
        category_group_name
        phone
        address_name
        road_address_name
        place_url
        distance
        x
        y
      }
    }
  }`,
  output: {
    data: {
      createSticker: {
        sticker_index: 3,
        sweet_percent: 50,
        is_used: false,
        spot: {
          place_id: "27314276",
          place_name: "소년소고기",
          category_name: "음식점 > 한식 > 육류,고기",
          category_group_code: "FD6",
          category_group_name: "음식점",
          phone: "02-3394-5267",
          address_name: "서울 동대문구 장안동 463-7",
          road_address_name: "서울 동대문구 천호대로85길 26-6",
          place_url: "http://place.map.kakao.com/27314276",
          distance: "0",
          x: 127.06707418096332,
          y: 37.56272196299047,
        },
      },
    },
  },
};
