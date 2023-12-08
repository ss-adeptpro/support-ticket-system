import { useState } from "react";

type TAlertProps = {
  message: string
}

function UserDeleteSuccess(props: TAlertProps) {

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);

  const closeDialogHandler = () => {
    setIsDialogOpen(false);
  }

  if(!isDialogOpen)
    return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-2 mx-4 md:relative shadow-lg">
            <div
              className="mb-3 inline-flex w-full items-center rounded-lg bg-success-100 px-6 py-5 text-base text-primary-500"
              role="alert">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    fill="#438a42"
                    clipRule="evenodd" />
                </svg>
              </span>
              {props.message}
            </div>

            <div className="text-center md:text-right mt-2 md:flex md:justify-end">
              <button id="confirm-cancel-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1" onClick={closeDialogHandler}>
                Close
              </button>
            </div>

          </div>
      </div>
  </div>  
  )
}

export default UserDeleteSuccess