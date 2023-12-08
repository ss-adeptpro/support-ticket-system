import React, { useImperativeHandle, useRef, useState } from "react"
import { TUserDeleteDialogProps, TUserDeleteDialogRef } from "./users.types";
import UserDeleteSuccess from "./UserDeleteSuccess";
import UserDeleteFailure from "./UserDeleteFailure";
import Spinner from "../../components/Spinner";

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
    //disabledSync.current = true;
    setIsDeleteProgress(true);
    props.onUserDelete(event, userId);
  }

  if(!isDialogOpen)
    return <></>;

  //const content = '';
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
                      <p className="font-bold">Delete Warning for user - <span className="capitalize">{userRef.current?.userName}</span></p>
                      <p className="text-sm text-gray-700 mt-1">
                        You will lose all of this user's data by deleting
                        and this action cannot be undone.
                      </p>
                    </div>
                      
              </div>
                
                  <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button disabled={isDeleteProgress} id="confirm-delete-btn" 
                        className="transition shadow-md duration-300 hover:text-red-200 hover:bg-red-700 block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg text-sm md:ml-2 md:order-2" 
                            // onClick={(event) => props.onUserDelete(event, userIdRef.current)}
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

              
                {/* 
                
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <p className="text-green-700">User deleted successfully/</p>
                      </div>

                  
                      <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <p className="text-red-700">User not deleted successfully/</p>
                      </div>
                
                <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                  <button disabled type="button" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#B91C1C"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Deleting...
                  </button>
                </div> */}
          </div>
      </div>
  </div>
)
}
)

export default UserDeleteDialog