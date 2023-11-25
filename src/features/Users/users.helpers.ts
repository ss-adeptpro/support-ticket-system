import { TUser, TUsers } from "./users.types"

//add id in the response
export const customTransformUsers = (responseData:TUsers) => {
  return responseData.map((item:any): TUser => {
    // item.id = item?._id ?? null;
    // item["_id"] && delete item["_id"];
    // delete item["__v"];
    return {id:item?._id, username: item?.username, active:item?.active, roles:item?.roles}
  })
}

//validate api response
export const validateApiStatusUsers = (response:Response, result:any) => {
  //without Token request, result comes back with error {message: "UnauthorizedM"}
  //and response {status:401, ok:false}
  return response.status === 200 && !result.isError
}