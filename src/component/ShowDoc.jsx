import React from 'react'
import { FaFilePdf } from 'react-icons/fa'

export const ShowDoc = ({isEmployee}) => {
  return (
    <div className='flex flex-col'>
    
                    {isEmployee?.avatar ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">Profile Photo</p>
                      </div>
                    ) : null}
                    {isEmployee?.aadhar ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">Aadhar Card</p>
                      </div>
                    ) : null}
                    {isEmployee?.pan ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">PanCard</p>
                      </div>
                    ) : null}
                    {isEmployee?.back ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">Bank Document</p>
                      </div>
                    ) : null}
                    {isEmployee?.PF ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">PF Document</p>
                      </div>
                    ) : null}
                    {isEmployee?.xthMarksheet ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">10th Marksheet</p>
                      </div>
                    ) : null}
                    {isEmployee?.xiithMarksheet ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">12th Marksheet</p>
                      </div>
                    ) : null}
                    {isEmployee?.graduationMarksheet ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">Graduation Marksheet</p>
                      </div>
                    ) : null}
                    {isEmployee?.pgMarksheet ? (
                      <div className="flex items-center mb-2">
                        <FaFilePdf className="text-red-500 text-2xl" />
                        <p className="ml-2">Post Graduat Marksheet</p>
                      </div>
                    ) : null}
    </div>
  )
}

