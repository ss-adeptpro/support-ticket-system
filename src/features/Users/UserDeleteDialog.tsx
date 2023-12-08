import React, { useImperativeHandle, useRef, useState } from "react"
import { TUserDeleteDialogProps, TUserDeleteDialogRef } from "./users.types";
import UserDeleteSuccess from "./UserDeleteSuccess";
import UserDeleteFailure from "./UserDeleteFailure";
import Spinner from "../../components/Spinner";
import { USER_CONFIRM_DIALOG_TEXT, USER_CONFIRM_DIALOG_TITLE } from "./users.constants";

type TUserRef = {
  userId: string,
  userName: string
}

const UserRefInitial:TUserRef = {
  userId: '',
  userName : ''
}

type TDeleteResponse = {
  isSuccess: boolean,
  message : string
}

const deleteResponseInitial:TDeleteResponse = {
  isSuccess: false, message: ''
}

//Show confirmation dialog to delete user
const UserDeleteDialog = React.forwardRef<TUserDeleteDialogRef, TUserDeleteDialogProps>((props: TUserDeleteDialogProps, ref:any) => {
  
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteProgress, setIsDeleteProgress] = useState<boolean>(false);
  const userRef = useRef<TUserRef>(UserRefInitial);

  const [deleteResponse, setDeleteResponse] = useState<TDeleteResponse>(deleteResponseInitial);
  
  //customize the ref methods to be used in parent
  useImperativeHandle(ref, () => (
      {
        //open the dialog from parent
        openDialog (userId: string, userName:string) {
            setIsDialogOpen(true);
            setIsDeleteProgress(false);
            userRef.current = {userId: userId, userName: userName};
            setDeleteResponse(deleteResponseInitial);
          },

        //close the dialog from parent
        closeDialog () {
            setIsDialogOpen(false);
            setIsDeleteProgress(false);
            userRef.current = UserRefInitial;
            setDeleteResponse(deleteResponseInitial);
          }
        ,
        //delete progress is done and we got a response from parent
        deleteAlert (isSuccess: boolean, message: string) {
          setDeleteResponse({isSuccess, message});
          setIsDeleteProgress(false);
        }
      }
  ));
  
  //close the dialog from self
  const closeDialogHandler = () => {
    setIsDeleteProgress(false);
    setIsDialogOpen(false);
  }
  
  const userDeleteHandler = (event:any, userId:string) => {
    setIsDeleteProgress(true);
    props.onUserDelete(event, userId);
  }

  if(!isDialogOpen)
    return <></>;
  
  if(deleteResponse.message) {
    return deleteResponse.isSuccess ? 
      <UserDeleteSuccess message={deleteResponse.message} /> : 
      <UserDeleteFailure message={deleteResponse.message} />
  }

  return (
    
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <div className="md:flex items-center">
                  <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">
                  &#9888;
                  </i>
                  </div>
                  
                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                      <p className="font-bold">{USER_CONFIRM_DIALOG_TITLE} - <span className="capitalize">{userRef.current?.userName}</span></p>
                      <p className="text-sm text-gray-700 mt-1">{USER_CONFIRM_DIALOG_TEXT} </p>
                    </div>
                      
              </div>
                
                  <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button disabled={isDeleteProgress} id="confirm-delete-btn" 
                        className="transition shadow-md duration-300 hover:text-red-200 hover:bg-red-700 block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg text-sm md:ml-2 md:order-2" 
                            onClick={(event) => userDeleteHandler(event, userRef.current?.userId )}
                          >
                            { isDeleteProgress ? <Spinner size={4} text="Deleting..." /> : 'Delete' }
                        </button>

                      { !isDeleteProgress && (
                            <button id="confirm-cancel-btn" className="transition shadow-md duration-300 hover:text-white hover:bg-gray-700 block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg text-sm mt-4 md:mt-0 md:order-1" onClick={closeDialogHandler}>
                              {deleteResponse.message ? 'Close' : 'Cancel'}
                            </button>
                          )
                      }
                  </div>
          </div>
      </div>
  </div>
)
}
)

export default UserDeleteDialog